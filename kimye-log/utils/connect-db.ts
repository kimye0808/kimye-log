import { MongoClient, ObjectId } from "mongodb";
/**
 *
 * @returns db에 연결하고 db객체 리턴 실패시 response
 */
export async function connectToDatabase() {
  //db에 connect
  let client: MongoClient;
  const connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.7z6drok.mongodb.net/`;
  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    throw error;
  }
  const db = client.db();
  return { client, db };
}
