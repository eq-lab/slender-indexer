import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class BorrowingDisabledEvent extends BaseEvent {
  asset?: string;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[], data: any[]) {
    super(record, SlenderEventType.BorrowingDisabled);

    this.asset = topics[1];
  }
}
