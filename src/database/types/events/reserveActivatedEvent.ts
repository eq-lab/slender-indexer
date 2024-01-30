import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class ReserveActivatedEvent extends BaseEvent {
  asset?: string;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[]) {
    super(record, SlenderEventType.ReserveActivated);

    this.asset = topics[1];
  }
}
