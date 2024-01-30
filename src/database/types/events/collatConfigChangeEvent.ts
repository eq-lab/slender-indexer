import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class CollatConfigChangeEvent extends BaseEvent {
  asset?: string;
  liquidityCap?: number;
  liquidationOrder?: number;
  utilCap?: number;
  discount?: number;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[]) {
    super(record, SlenderEventType.CollatConfigChange);

    this.asset = topics[1];
    this.liquidityCap = topics[2];
    this.liquidationOrder = topics[3];
    this.utilCap = topics[4];
    this.discount = topics[5];
  }
}
