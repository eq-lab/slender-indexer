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
  [`${SlenderEventType.Repay}`, (event, topics, data) => new RepayEvent(event, topics, data)],
  [`${SlenderEventType.Borrow}`, (event, topics, data) => new BorrowEvent(event, topics, data)],
  [`${SlenderEventType.Deposit}`, (event, topics, data) => new DepositEvent(event, topics, data)],
  [`${SlenderEventType.Withdraw}`, (event, topics, data) => new WithdrawEvent(event, topics, data)],
  [`${SlenderEventType.FlashLoan}`, (event, topics, data) => new FlashLoanEvent(event, topics, data)],
  [`${SlenderEventType.Liquidation}`, (event, topics, data) => new LiquidationEvent(event, topics, data)],
  [`${SlenderEventType.Initialized}`, (event, topics, data) => new InitializedEvent(event, topics, data)],
  [`${SlenderEventType.BorrowingEnabled}`, (event, topics, data) => new BorrowingEnabledEvent(event, topics, data)],
  [`${SlenderEventType.BorrowingDisabled}`, (event, topics, data) => new BorrowingDisabledEvent(event, topics, data)],
  [`${SlenderEventType.ReserveActivated}`, (event, topics, data) => new ReserveActivatedEvent(event, topics, data)],
  [`${SlenderEventType.ReserveDeactivated}`, (event, topics, data) => new ReserveDeactivatedEvent(event, topics, data)],
  [`${SlenderEventType.CollatConfigChange}`, (event, topics, data) => new CollatConfigChangeEvent(event, topics, data)],
  [
    `${SlenderEventType.ReserveUsedAsCollateralEnabled}`,
    (event, topics, data) => new ReserveUsedAsCollateralEnabledEvent(event, topics, data),
  ],
  [
    `${SlenderEventType.ReserveUsedAsCollateralDisabled}`,
    (event, topics, data) => new ReserveUsedAsCollateralDisabledEvent(event, topics, data),
  ],
]);
