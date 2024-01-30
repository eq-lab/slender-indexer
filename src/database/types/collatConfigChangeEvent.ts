import { SlenderEventType } from "./eventType";
import { ISlenderEvent } from "./event";

export class CollatConfigChangeEvent implements ISlenderEvent {
  constructor(
    ledger: number,
    hash: string,
    createdAt: Date,
    asset: string,
    liquidityCap: number,
    liquidationOrder: number,
    utilCap: number,
    discount: number,
  ) {
    this.ledger = ledger;
    this.hash = hash;
    this.createdAt = createdAt;
    this.type = SlenderEventType.CollatConfigChange;

    this.asset = asset;
    this.liquidityCap = liquidityCap;
    this.liquidationOrder = liquidationOrder;
    this.utilCap = utilCap;
    this.discount = discount;
  }

  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  asset?: string;
  liquidityCap?: number;
  liquidationOrder?: number;
  utilCap?: number;
  discount?: number;
}
