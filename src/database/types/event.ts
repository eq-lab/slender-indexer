import { SlenderEventType } from './eventType';

export interface ISlenderEvent {
  // required transaction fields
  ledger: number;
  hash: string;
  createdAt: Date;
  type: SlenderEventType;

  admin?: string;
  to?: string;
  who?: string;
  asset?: string;
  amount?: string;
  premium?: string;
  receiver?: string;
  treasury?: string;
  coveredDebt?: string;
  liquidatedCollat?: string;

  // collateral parameters
  liquidityCap?: string;
  liquidationOrder?: number;
  utilCap?: number;
  discount?: number;

  // interest rate parameters
  alpha?: number;
  initialRate?: number;
  maxRate?: number;
  scalingCoeff?: number;
}
