import { connect, connection, disconnect } from 'mongoose';

import { SlenderCollectionStatus, SlenderEvent, SlenderPosition } from './schema';
import { ICollectionStatus, ISlenderEvent, ISlenderPosition } from './types';

export class DbService {
  public async init(connsectionString: string, user: string, password: string): Promise<DbService> {
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

      await connect(`${connsectionString}`, {
        user: user,
        pass: password,
        authSource: 'admin',
        retryReads: true,
        retryWrites: true,
      });
    });

    await connect(`${connsectionString}`, {
      user: user,
      pass: password,
      authSource: 'admin',
      retryReads: true,
      retryWrites: true,
    });

    return this;
  }

  public async savePositions(positions: ISlenderPosition[]): Promise<void> {
    if (positions.length === 0) return;

    await SlenderPosition.deleteMany();
    await SlenderPosition.insertMany(positions);
  }

  public async saveStatus(ledger: number): Promise<void> {
    await SlenderCollectionStatus.deleteMany();
    await new SlenderCollectionStatus({
      ledger: ledger,
    }).save();
  }

  public async saveEvents(events: ISlenderEvent[]): Promise<void> {
    if (events.length === 0) return;

    await SlenderEvent.insertMany(events);
  }

  public async getCollectionStatus(): Promise<ICollectionStatus> {
    const status = await SlenderCollectionStatus.findOne().exec();
    return status;
  }
}
