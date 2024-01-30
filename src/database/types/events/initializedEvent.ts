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

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[]) {
    super(record, SlenderEventType.Initialized);

    this.admin = topics[1];
    this.treasury = topics[2];
    this.alpha = topics[3];
    this.initialRate = topics[4];
    this.maxRate = topics[5];
    this.scalingCoeff = topics[6];
  }
}
