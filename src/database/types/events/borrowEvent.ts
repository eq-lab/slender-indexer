import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class BorrowEvent extends BaseEvent {
  who?: string;
  asset?: string;
  amount?: number;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[]) {
    super(record, SlenderEventType.Borrow);

    this.who = topics[1];
    this.asset = topics[2];
    this.amount = topics[3];
  }
}
