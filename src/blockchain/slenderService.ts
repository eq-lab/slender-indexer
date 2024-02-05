import {
  Address,
  Contract,
  Horizon,
  SorobanRpc,
  TimeoutInfinite,
  TransactionBuilder,
  humanizeEvents,
  xdr,
} from '@stellar/stellar-sdk';

import { ISlenderEvent, ISlenderPosition, SlenderEvents } from '../database/types';
import { convertScvToJs } from './converter';
import { ISlenderAccountPosition } from './types/slenderAccountPosition';

export class SlenderService {
  horizon: Horizon.Server;
  soroban: SorobanRpc.Server;
  contractId: string;
  caller: string;
  passPhrase: string;

  constructor(horizonUri: string, sorobanRpcUri: string, contractId: string, caller: string, passPhrase: string) {
    this.horizon = new Horizon.Server(horizonUri);
    this.soroban = new SorobanRpc.Server(sorobanRpcUri);
    this.contractId = contractId;
    this.caller = caller;
    this.passPhrase = passPhrase;
  }

  async getEvents(ledger: number): Promise<ISlenderEvent[]> {
    const result = [];
    const transactions = await this.horizon.transactions().forLedger(ledger).call();

    for (const record of transactions.records) {
      const meta = xdr.TransactionMeta.fromXDR(record.result_meta_xdr, 'base64');
      const sorobanMeta = meta.v3().sorobanMeta();

      if (!sorobanMeta || !sorobanMeta.events()) continue;

      humanizeEvents(sorobanMeta.events())
        .filter((x) => x.contractId === this.contractId && SlenderEvents.has(x.topics[0]))
        .map((e) => SlenderEvents.get(e.topics[0])(record, e.topics, e.data))
        .forEach((e) => result.push(e));
    }

    return result;
  }

  async getPositions(lenders: string[]): Promise<ISlenderPosition[]> {
    const tasks = lenders.map((b) =>
      fetch(
        this.soroban,
        this.caller,
        this.passPhrase,
        this.contractId,
        'account_position',
        Address.fromString(b).toScVal(),
      )
        .then((p) => ({ lender: b, position: p }))
        .catch(() => undefined),
    );

    const positions = (await Promise.all(tasks))
      .filter((t) => !!t)
      .map((t) => {
        const position = convertScvToJs<ISlenderAccountPosition>(t.position);
        return <ISlenderPosition>{
          who: t.lender,
          discountedCollateral: position.discounted_collateral,
          debt: position.debt,
          npv: position.npv,
        };
      });

    return positions;
  }

  async getLatestLedger(): Promise<number> {
    return (await this.soroban.getLatestLedger()).sequence;
  }
}

const fetch = async (
  soroban: SorobanRpc.Server,
  caller: string,
  passPhrase: string,
  contractId: string,
  method: string,
  ...args: xdr.ScVal[]
): Promise<xdr.ScVal> => {
  const source = await soroban.getAccount(caller);
  const contract = new Contract(contractId);

  const operation = new TransactionBuilder(source, {
    fee: '100',
    networkPassphrase: passPhrase,
  })
    .addOperation(contract.call(method, ...(args || [])))
    .setTimeout(TimeoutInfinite)
    .build();

  const simulated = await soroban.simulateTransaction(operation);

  if (SorobanRpc.Api.isSimulationError(simulated)) {
    throw new Error(simulated.error);
  } else if (!simulated.result) {
    throw new Error(`invalid simulation: no result in ${simulated}`);
  }

  return simulated.result.retval;
};
