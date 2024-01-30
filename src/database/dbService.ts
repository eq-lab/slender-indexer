import { connect, connection, disconnect } from "mongoose";
import { SlenderCollectionStatus, SlenderEvent, SlenderPosition } from "./schema";
import { ICollectionStatus, ISlenderEvent, ISlenderPosition } from "./types";

export class DbService {
  public async init(): Promise<void> {
    connection.on("error", async (error) => {
      console.error("Error in MongoDb connection: " + error);
      await disconnect();
    });

    connection.on("connected", () => {
      console.log("MongoDB connected!");
    });

    connection.on("reconnected", () => {
      console.log("MongoDB reconnected!");
    });

    connection.on("disconnected", async () => {
      console.log("MongoDB disconnected!");

      await connect(`${process.env.MONGO_CONNECTION_STRING}`, {
        user: process.env.MONGO_INITDB_ROOT_USERNAME,
        pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
        authSource: "admin",
        retryReads: true,
        retryWrites: true,
      });
    });

    await connect(`${process.env.MONGO_CONNECTION_STRING}`, {
      user: process.env.MONGO_INITDB_ROOT_USERNAME,
      pass: process.env.MONGO_INITDB_ROOT_PASSWORD,
      authSource: "admin",
      retryReads: true,
      retryWrites: true,
    });
  }

  public async savePositions(positions: ISlenderPosition[]): Promise<void> {
    await SlenderPosition.deleteMany();
    await SlenderPosition.insertMany(positions);
  }

  public async saveStatus(satus: ICollectionStatus): Promise<void> {
    await SlenderCollectionStatus.deleteMany();
    await SlenderCollectionStatus.insertMany(satus);
  }

  public async saveEvent(event: ISlenderEvent): Promise<void> {
    await new SlenderEvent(event).save();
  }
}
