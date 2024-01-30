import { SlenderEventType } from "./eventType";
import { ISlenderEvent } from "./event";

export class FlashLoanEvent implements ISlenderEvent {
  constructor(
    ledger: number,
    hash: string,
    createdAt: Date,
    who: string,
    asset: string,
    receiver: string,
    amount: number,
    premium: number,
  ) {
    this.ledger = ledger;
    this.hash = hash;
    this.createdAt = createdAt;
    this.type = SlenderEventType.FlashLoan;

    this.who = who;
    this.asset = asset;
    this.receiver = receiver;
    this.amount = amount;
    this.premium = premium;
  }

  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  who?: string;
  asset?: string;
  receiver?: string;
  amount?: number;
  premium?: number;
}
