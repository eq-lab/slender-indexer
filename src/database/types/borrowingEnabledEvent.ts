import { SlenderEventType } from "./eventType";
import { ISlenderEvent } from "./event";

export class BorrowingEnabledEvent implements ISlenderEvent {
  constructor(ledger: number, hash: string, createdAt: Date, asset: string) {
    this.ledger = ledger;
    this.hash = hash;
    this.createdAt = createdAt;
    this.type = SlenderEventType.BorrowingEnabled;

    this.asset = asset;
  }

  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  asset?: string;
}
