import { SlenderEventType } from "./eventType";
import { ISlenderEvent } from "./event";

export class RepayEvent implements ISlenderEvent {
  constructor(ledger: number, hash: string, createdAt: Date, who: string, asset: string, amount: number) {
    this.ledger = ledger;
    this.hash = hash;
    this.createdAt = createdAt;
    this.type = SlenderEventType.Repay;

    this.who = who;
    this.asset = asset;
    this.amount = amount;
  }

  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  who?: string;
  asset?: string;
  amount?: number;
}
