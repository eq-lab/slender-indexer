import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class ReserveUsedAsCollateralEnabledEvent extends BaseEvent {
  who?: string;
  asset?: string;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[]) {
    super(record, SlenderEventType.ReserveUsedAsCollateralEnabled);

    this.who = topics[1];
    this.asset = topics[2];
  }
}
