import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class CollatConfigChangeEvent extends BaseEvent {
  asset?: string;
  liquidityCap?: number;
  liquidationOrder?: number;
  utilCap?: number;
  discount?: number;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[], data: any[]) {
    super(record, SlenderEventType.CollatConfigChange);

    this.asset = topics[1];

    this.liquidityCap = data[0];
    this.liquidationOrder = data[1];
    this.utilCap = data[2];
    this.discount = data[3];
  }
}
