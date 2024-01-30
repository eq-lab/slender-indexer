import { SlenderEventType } from "./eventType";
import { ISlenderEvent } from "./event";

export class BorrowingDisabledEvent implements ISlenderEvent {
  constructor(ledger: number, hash: string, createdAt: Date, asset: string) {
    this.ledger = ledger;
    this.hash = hash;
    this.createdAt = createdAt;
    this.type = SlenderEventType.BorrowingDisabled;

    this.asset = asset;
  }

  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  asset?: string;
}
