import { Horizon, humanizeEvents, xdr } from '@stellar/stellar-sdk';
import { Server } from '@stellar/stellar-sdk/lib/horizon';

import { ISlenderEvent, SlenderEvents } from '../database/types';

export class SlenderService {
  server: Server;
  contractId: string;

  constructor(horizonUri: string, contractId: string) {
    this.server = new Horizon.Server(horizonUri);
    this.contractId = contractId;
  }

  public async pollEvents(ledger: number): Promise<ISlenderEvent[]> {
    const result = [];
    const transactions = await this.server.transactions().forLedger(ledger).call();

    for (const record of transactions.records) {
      const meta = xdr.TransactionMeta.fromXDR(record.result_meta_xdr, 'base64');

      humanizeEvents(meta.v3().sorobanMeta().events())
        .filter((x) => x.contractId === this.contractId && SlenderEvents.has(x.topics[0]))
        .map((e) => SlenderEvents[e.topics[0]](record, e.topics))
        .forEach((e) => result.push(record, e));
    }

    return result;
  }
}
