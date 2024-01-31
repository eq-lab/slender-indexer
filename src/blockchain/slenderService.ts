import { Horizon, SorobanRpc, humanizeEvents, xdr } from '@stellar/stellar-sdk';

import { ISlenderEvent, SlenderEvents } from '../database/types';

export class SlenderService {
  horizon: Horizon.Server;
  soroban: SorobanRpc.Server;
  contractId: string;

  constructor(horizonUri: string, sorobanRpcUri: string, contractId: string) {
    this.horizon = new Horizon.Server(horizonUri);
    this.soroban = new SorobanRpc.Server(sorobanRpcUri);
    this.contractId = contractId;
  }

  public async getEvents(ledger: number): Promise<ISlenderEvent[]> {
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

  public async getLatestLedger(): Promise<number> {
    return (await this.soroban.getLatestLedger()).sequence;
  }
}
