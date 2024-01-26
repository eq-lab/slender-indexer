import mongoose, { Schema } from "mongoose";

export enum EventType {
  Buy = "buy",
  Sell = "sell",
}

interface Event {
  // required transaction fields
  ledger: number;
  hash: string;
  createdAt: Date;
  type: EventType;

  to?: string;
  who?: string;
  asset?: string;
  amount?: number;
  premium?: number;
  receiver?: string;
  treasury?: string;
  coveredDebt?: number;
  liquidatedCollat?: number;

  // collateral parameters
  liquidityCap?: number;
  liquidationOrder?: number;
  utilCap?: number;
  discount?: number;

  // interest rate parameters
  alpha?: number;
  initialRate?: number;
  maxRate?: number;
  scalingCoeff?: number;
}

const schema = new Schema<Event>(
  {
    ledger: {
      type: Number,
      required: true,
    },
    hash: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    type: {
      type: String,
      enum: EventType,
      required: true,
    },
    to: {
      type: String,
      required: false,
    },
    who: {
      type: String,
      required: false,
    },
    asset: {
      type: String,
      required: false,
    },
    amount: {
      type: Number, // TODO: Decimal128?
      required: false,
    },
    premium: {
      type: Number, // TODO: Decimal128?
      required: false,
    },
    receiver: {
      type: String,
      required: false,
    },
    treasury: {
      type: String,
      required: false,
    },
    coveredDebt: {
      type: Number, // TODO: Decimal128?
      required: false,
    },
    liquidatedCollat: {
      type: Number, // TODO: Decimal128?
      required: false,
    },
    liquidityCap: {
      type: Number, // TODO: Decimal128?
      required: false,
    },
    liquidationOrder: {
      type: Number,
      required: false,
    },
    utilCap: {
      type: Number,
      required: false,
    },
    discount: {
      type: Number,
      required: false,
    },
    alpha: {
      type: Number,
      required: false,
    },
    initialRate: {
      type: Number,
      required: false,
    },
    maxRate: {
      type: Number,
      required: false,
    },
    scalingCoeff: {
      type: Number,
      required: false,
    },
  },
  {
    strict: false,
  },
);

export const Event = mongoose.model("Event", schema);
