import { SlenderEventType } from './eventType';
import { BorrowEvent } from './events/borrowEvent';
import { BorrowingDisabledEvent } from './events/borrowingDisabledEvent';
import { BorrowingEnabledEvent } from './events/borrowingEnabledEvent';
import { CollatConfigChangeEvent } from './events/collatConfigChangeEvent';
import { DepositEvent } from './events/depositEvent';
import { FlashLoanEvent } from './events/flashLoanEvent';
import { InitializedEvent } from './events/initializedEvent';
import { LiquidationEvent } from './events/liquidationEvent';
import { RepayEvent } from './events/repayEvent';
import { ReserveActivatedEvent } from './events/reserveActivatedEvent';
import { ReserveDeactivatedEvent } from './events/reserveDeactivatedEvent';
import { ReserveUsedAsCollateralDisabledEvent } from './events/reserveUsedAsCollateralDisabledEvent';
import { ReserveUsedAsCollateralEnabledEvent } from './events/reserveUsedAsCollateralEnabledEvent';
import { WithdrawEvent } from './events/withdrawEvent';

export { ISlenderEvent } from './event';
export { SlenderEventType } from './eventType';
export { ISlenderPosition } from './position';
export { ICollectionStatus } from './collectionStatus';

export const SlenderEvents = new Map([
  [SlenderEventType.Repay, (r, t) => new RepayEvent(r, t)],
  [SlenderEventType.Borrow, (r, t) => new BorrowEvent(r, t)],
  [SlenderEventType.Deposit, (r, t) => new DepositEvent(r, t)],
  [SlenderEventType.Withdraw, (r, t) => new WithdrawEvent(r, t)],
  [SlenderEventType.FlashLoan, (r, t) => new FlashLoanEvent(r, t)],
  [SlenderEventType.Liquidation, (r, t) => new LiquidationEvent(r, t)],
  [SlenderEventType.Initialized, (r, t) => new InitializedEvent(r, t)],
  [SlenderEventType.BorrowingEnabled, (r, t) => new BorrowingEnabledEvent(r, t)],
  [SlenderEventType.BorrowingDisabled, (r, t) => new BorrowingDisabledEvent(r, t)],
  [SlenderEventType.ReserveActivated, (r, t) => new ReserveActivatedEvent(r, t)],
  [SlenderEventType.ReserveDeactivated, (r, t) => new ReserveDeactivatedEvent(r, t)],
  [SlenderEventType.CollatConfigChange, (r, t) => new CollatConfigChangeEvent(r, t)],
  [SlenderEventType.ReserveUsedAsCollateralEnabled, (r, t) => new ReserveUsedAsCollateralEnabledEvent(r, t)],
  [SlenderEventType.ReserveUsedAsCollateralDisabled, (r, t) => new ReserveUsedAsCollateralDisabledEvent(r, t)],
]);
