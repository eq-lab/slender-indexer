import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class InitializedEvent extends BaseEvent {
  admin?: string;
  treasury?: string;
  alpha?: number;
  initialRate?: number;
  maxRate?: number;
  scalingCoeff?: number;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[], data: any[]) {
    super(record, SlenderEventType.Initialized);

    this.admin = topics[1];
    this.treasury = topics[2];

    this.alpha = data[0];
    this.initialRate = data[1];
    this.maxRate = data[2];
    this.scalingCoeff = data[3];
  }
}
