import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class WithdrawEvent extends BaseEvent {
  who?: string;
  asset?: string;
  to?: string;
  amount?: number;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[]) {
    super(record, SlenderEventType.Withdraw);

    this.who = topics[1];
    this.to = topics[2];
    this.asset = topics[3];
    this.amount = topics[4];
  }
}
