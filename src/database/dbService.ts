import { connect, connection, disconnect } from 'mongoose';

import { SlenderCollectionStatus, SlenderEvent, SlenderPosition } from './schema';
import { ICollectionStatus, ISlenderEvent, ISlenderPosition, SlenderEventType } from './types';

export class DbService {
  async init(connsectionString: string, user: string, password: string): Promise<DbService> {
    connection.on('error', async (error) => {
      console.error('Error in MongoDb connection: ' + error);
      await disconnect();
    });

    connection.on('connected', () => {
      console.log('MongoDB connected!');
    });

    connection.on('reconnected', () => {
      console.log('MongoDB reconnected!');
    });

    connection.on('disconnected', async () => {
      console.log('MongoDB disconnected!');

      await mongoConnect(connsectionString, user, password);
    });

    await mongoConnect(connsectionString, user, password);

    return this;
  }

  async upsertPositions(positions: ISlenderPosition[]): Promise<void> {
    if (positions.length === 0) return;

    const bulk = positions.map((p) => ({
      updateOne: {
        filter: { who: p.who },
        update: p,
        upsert: true,
      },
    }));

    await SlenderPosition.bulkWrite(bulk);
  }

  async insertStatus(ledger: number): Promise<void> {
    await SlenderCollectionStatus.deleteMany();
    await new SlenderCollectionStatus({
      ledger: ledger,
    }).save();
  }

  async insertEvents(events: ISlenderEvent[]): Promise<void> {
    if (events.length === 0) return;

    await SlenderEvent.insertMany(events);
  }

  async getCollectionStatus(): Promise<ICollectionStatus> {
    const status = await SlenderCollectionStatus.findOne().exec();

    return status;
  }

  async getUniqueLenders(): Promise<string[]> {
    const lenders = await SlenderEvent.find({ type: SlenderEventType.Deposit }).distinct('who').exec();

    return lenders;
  }

  async deletePositionsExceptLenders(borrowers: string[]): Promise<void> {
    await SlenderPosition.deleteMany({ who: { $nin: borrowers || [] } });
  }
}

const mongoConnect = async (connsectionString: string, user: string, password: string): Promise<void> => {
  await connect(`${connsectionString}`, {
    user: user,
    pass: password,
    authSource: 'admin',
    retryReads: true,
    retryWrites: true,
  });
};
