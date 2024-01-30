import "dotenv/config";
import { DbService } from "./database/dbService";
import { BorrowEvent, LiquidationEvent } from "./database/types";

async function main() {
  const dbService = new DbService();
  await dbService.init();

  const event1 = new BorrowEvent(1, "test1", new Date(), "who", "asset", 123);
  await dbService.saveEvent(event1);

  const event2 = new LiquidationEvent(1, "test2", new Date(), "who", 123, 456);
  await dbService.saveEvent(event2);

  await dbService.savePositions([
    {
      who: "test1",
      npv: 123,
      discountedCollateral: 12,
      debt: 1,
    },
    {
      who: "test2",
      npv: 1231,
      discountedCollateral: 121,
      debt: 11,
    },
  ]);
}

main()
  .catch(console.error)
  .finally(() => process.exit());
