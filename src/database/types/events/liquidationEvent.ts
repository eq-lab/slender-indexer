import { Horizon } from '@stellar/stellar-sdk';

import { BaseEvent } from '../baseEvent';
import { SlenderEventType } from '../eventType';

export class LiquidationEvent extends BaseEvent {
  who?: string;
  coveredDebt?: number;
  liquidatedCollat?: number;

  constructor(record: Horizon.ServerApi.TransactionRecord, topics: any[], data: any[]) {
    super(record, SlenderEventType.Liquidation);

    this.who = topics[1];

    this.coveredDebt = data[0];
    this.liquidatedCollat = data[1];
  }
}
