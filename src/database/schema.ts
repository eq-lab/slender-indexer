import { Schema, model } from 'mongoose';

import { ICollectionStatus, ISlenderEvent, ISlenderPosition, SlenderEventType } from './types';

const EventSchema = new Schema<ISlenderEvent>(
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
      enum: SlenderEventType,
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
      type: String,
      required: false,
    },
    premium: {
      type: String,
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
      type: String,
      required: false,
    },
    liquidatedCollat: {
      type: String,
      required: false,
    },
    liquidityCap: {
      type: String,
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

const PositionSchema = new Schema<ISlenderPosition>({
  who: {
    type: String,
    required: true,
  },
  npv: {
    type: Number,
    required: true,
  },
  discountedCollateral: {
    type: Number,
    required: true,
  },
  debt: {
    type: Number,
    required: true,
  },
});

const CollectionStatusSchema = new Schema<ICollectionStatus>({
  ledger: {
    type: Number,
    required: true,
  },
});

export const SlenderEvent = model('Event', EventSchema);
export const SlenderPosition = model('Position', PositionSchema);
export const SlenderCollectionStatus = model('CollectionStatus', CollectionStatusSchema);
