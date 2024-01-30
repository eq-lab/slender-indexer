import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class BorrowingEnabledEvent extends BaseEvent {
  asset?: string;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[]) {
    super(record, SlenderEventType.BorrowingEnabled);

    this.asset = topics[1];
  }
}
