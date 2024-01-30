import 'dotenv/config';

import { SlenderService } from './blockchain/slenderService';
import { DbService } from './database/dbService';
import { delay } from './utils';

async function main() {
  const slender = new SlenderService(process.env.HORIZON_URL, process.env.SLENDER_POOL_CONTRACT_ID);
  const dbService = await new DbService().init(
    process.env.MONGO_CONNECTION_STRING,
    process.env.MONGO_INITDB_ROOT_USERNAME,
    process.env.MONGO_INITDB_ROOT_PASSWORD,
  );

  const status = await dbService.getCollectionStatus();
  let ledger = status?.ledger ? status.ledger : +process.env.SLENDER_POOL_DEPLOYMENT_LEDGER;

  while (ledger !== Infinity) {
    const events = await slender.pollEvents(ledger);

    await dbService.saveEvents(events);
    await dbService.saveStatus(++ledger);

    await delay(5_000);
  }

  // TODO: borrower's positions
}

main()
  .catch(console.error)
  .finally(() => process.exit());
