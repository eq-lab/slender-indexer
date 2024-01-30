import { SlenderEventType } from "./eventType";
import { ISlenderEvent } from "./event";

export class InitializedEvent implements ISlenderEvent {
  constructor(
    ledger: number,
    hash: string,
    createdAt: Date,
    admin: string,
    treasury: string,
    alpha: number,
    initialRate: number,
    maxRate: number,
    scalingCoeff: number,
  ) {
    this.ledger = ledger;
    this.hash = hash;
    this.createdAt = createdAt;
    this.type = SlenderEventType.Initialized;

    this.admin = admin;
    this.treasury = treasury;
    this.alpha = alpha;
    this.initialRate = initialRate;
    this.maxRate = maxRate;
    this.scalingCoeff = scalingCoeff;
  }

  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  admin?: string;
  treasury?: string;
  alpha?: number;
  initialRate?: number;
  maxRate?: number;
  scalingCoeff?: number;
}
