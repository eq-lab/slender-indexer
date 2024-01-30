import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class FlashLoanEvent extends BaseEvent {
  who?: string;
  asset?: string;
  receiver?: string;
  amount?: number;
  premium?: number;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[]) {
    super(record, SlenderEventType.FlashLoan);

    this.who = topics[1];
    this.receiver = topics[2];
    this.asset = topics[3];
    this.amount = topics[4];
    this.premium = topics[5];
  }
}
