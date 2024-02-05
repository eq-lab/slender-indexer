import 'dotenv/config';

import { SlenderService } from './blockchain/slenderService';
import { DbService } from './database/dbService';
import { delay } from './utils';

export async function main() {
  const slenderService = new SlenderService(
    process.env.HORIZON_URL,
    process.env.SOROBAN_RPC_URL,
    process.env.SLENDER_POOL_CONTRACT_ID,
    process.env.SOROBAN_CALLER_ADDRESS,
    process.env.SOROBAN_RPC_PASSPHRASE,
  );
  const dbService = await new DbService().init(
    process.env.MONGO_CONNECTION_STRING,
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD,
  );

  const status = await dbService.getCollectionStatus();
  let ledger = status?.ledger ?? +process.env.SLENDER_POOL_DEPLOYMENT_LEDGER;

  while (ledger !== Infinity) {
    const latestLedger = await slenderService.getLatestLedger();

    if (ledger > latestLedger) {
      await delay(1000);
      continue;
    }

    const events = await slenderService.getEvents(ledger);

    console.log(`Ledger processed: ${ledger}, events processed: ${events.length}, latest ledger: ${latestLedger}`);

    await dbService.insertEvents(events);
    await dbService.insertStatus(++ledger);

    const lenders = await dbService.getUniqueLenders();
    const positions = await slenderService.getPositions(lenders);

    const validPositions = positions.filter((p) => p.debt !== 0n || p.discountedCollateral !== 0n);
    const validLenders = validPositions.map((vp) => vp.who);

    console.log(`Positions processed: ${validPositions.length}`);

    await dbService.deletePositionsExceptLenders(validLenders);
    await dbService.upsertPositions(validPositions);

    ledger++;
  }
}

main()
  .catch(console.error)
  .finally(() => process.exit());
