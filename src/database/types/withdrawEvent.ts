import { SlenderEventType } from "./eventType";
import { ISlenderEvent } from "./event";

export class WithdrawEvent implements ISlenderEvent {
  constructor(
    ledger: number,
    hash: string,
    createdAt: Date,
    who: string,
    asset: string,
    to: string,
    amount: number,
  ) {
    this.ledger = ledger;
    this.hash = hash;
    this.createdAt = createdAt;
    this.type = SlenderEventType.Withdraw;

    this.who = who;
    this.asset = asset;
    this.to = to;
    this.amount = amount;
  }

  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  who?: string;
  asset?: string;
  to?: string;
  amount?: number;
}
