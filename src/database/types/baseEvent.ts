import { Horizon } from '@stellar/stellar-sdk';

import { ISlenderEvent } from './event';
import { SlenderEventType } from './eventType';

export abstract class BaseEvent implements ISlenderEvent {
  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  constructor(record: Horizon.ServerApi.TransactionRecord, type: SlenderEventType) {
    this.ledger = record.ledger_attr;
    this.hash = record.hash;
    this.createdAt = new Date(record.created_at);
    this.type = type;
  }
}
