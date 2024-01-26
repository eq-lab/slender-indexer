import { Horizon } from "@stellar/stellar-sdk";
import { Configuration } from "./types";

export class IndexerBuilder {
  private server: Horizon.Server;

  constructor(config: Configuration) {
    this.server = new Horizon.Server(config.horizonUri);
  }

  public async run() {
    const asd = await this.server.transactions();
  }
}
