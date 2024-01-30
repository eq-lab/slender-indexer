import { SlenderEventType } from "./eventType";
import { ISlenderEvent } from "./event";

export class LiquidationEvent implements ISlenderEvent {
  constructor(
    ledger: number,
    hash: string,
    createdAt: Date,
    who: string,
    coveredDebt?: number,
    liquidatedCollat?: number,
  ) {
    this.ledger = ledger;
    this.hash = hash;
    this.createdAt = createdAt;
    this.type = SlenderEventType.Liquidation;

    this.who = who;
    this.coveredDebt = coveredDebt;
    this.liquidatedCollat = liquidatedCollat;
  }

  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  who?: string;
  coveredDebt?: number;
  liquidatedCollat?: number;
}
