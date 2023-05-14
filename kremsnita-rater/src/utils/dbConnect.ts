// utils/dbConnect.ts
import { MongoClient, Db, MongoClientOptions } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
} as MongoClientOptions);

async function dbConnect(): Promise<{db: Db, client: MongoClient}> {
  if (!client.isConnected()) await client.connect();
  const db = client.db(process.env.MONGODB_DB as string); // database name
  return { db, client };
}

export default dbConnect;
