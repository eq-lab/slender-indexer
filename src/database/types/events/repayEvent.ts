import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class RepayEvent extends BaseEvent {
  who?: string;
  asset?: string;
  amount?: number;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[], data: any[]) {
    super(record, SlenderEventType.Repay);

    this.who = topics[1];

    this.asset = data[0];
    this.amount = data[1];
  }
}
