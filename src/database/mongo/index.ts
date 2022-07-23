import { MongoClient } from "mongodb";

export default class MongoController {
  CONNECTION_URI: string;
  COLLECTIONS: Record<"USER", string>;

  constructor() {
    const {
      MONGO_DATABASE_NAME,
      MONGO_DATABASE_USERNAME,
      MONGO_DATABASE_PASSWORD,
      MONGO_COLLECTION_USER,
    } = process.env ?? {};

    this.CONNECTION_URI = `mongodb+srv://${MONGO_DATABASE_USERNAME}:${MONGO_DATABASE_PASSWORD}@open-study-cluster-0.83lpfw4.mongodb.net/${MONGO_DATABASE_NAME}?retryWrites=true&w=majority`;

    this.COLLECTIONS = {
      USER: MONGO_COLLECTION_USER as string,
    };
  }

  getClient() {
    return new MongoClient(this.CONNECTION_URI);
  }

  async getConnection() {
    let connectedClient: MongoClient | null = null;
    try {
      connectedClient = await this.getClient().connect();
    } catch (error) {
      console.error(error);
      connectedClient?.close(true);
    }
    return connectedClient;
  }
}
