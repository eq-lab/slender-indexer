import { SlenderEventType } from "./eventType";
import { ISlenderEvent } from "./event";

export class ReserveUsedAsCollateralDisabledEvent implements ISlenderEvent {
  constructor(ledger: number, hash: string, createdAt: Date, who: string, asset: string) {
    this.ledger = ledger;
    this.hash = hash;
    this.createdAt = createdAt;
    this.type = SlenderEventType.ReserveUsedAsCollateralDisabled;

    this.who = who;
    this.asset = asset;
  }

  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  who?: string;
  asset?: string;
}
