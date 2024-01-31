import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class WithdrawEvent extends BaseEvent {
  who?: string;
  asset?: string;
  to?: string;
  amount?: number;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[], data: any[]) {
    super(record, SlenderEventType.Withdraw);

    this.who = topics[1];

    this.to = data[0];
    this.asset = data[1];
    this.amount = data[2];
  }
}
