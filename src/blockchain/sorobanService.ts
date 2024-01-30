import { Horizon } from "@stellar/stellar-sdk";
import { Server } from "@stellar/stellar-sdk/lib/horizon";

export class SorobanService {
  server: Server;

  constructor() {
    this.server = new Horizon.Server(process.env.HORIZON_URL);
  }

  
}
