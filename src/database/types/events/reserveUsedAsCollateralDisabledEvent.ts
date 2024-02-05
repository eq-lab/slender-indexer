import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class ReserveUsedAsCollateralDisabledEvent extends BaseEvent {
  who?: string;
  asset?: string;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[], data: any) {
    super(record, SlenderEventType.ReserveUsedAsCollateralDisabled);

    this.who = topics[1];

    this.asset = data;
  }
}
