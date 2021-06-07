// import { MongoClient } from "mongodb";
// const MONGODB_URI = process.env.MONGODB_URI;
// let cachedDb: MongoClient = null;
// const options = { useNewUrlParser: true, useUnifiedTopology: true };
// export function getDatabase(): Promise<MongoClient> {
//   if (cachedDb) {
//     return Promise.resolve(cachedDb);
//   }
//   return MongoClient.connect(MONGODB_URI, options).then((db) => {
//     cachedDb = db; ///???
//     return cachedDb;
//   });
// }

import { MongoClient } from "mongodb";
const getDatabase = async () => {
  const databaseUrl = process.env.MONGODB_URI;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  const mongoDataBase = await MongoClient.connect(databaseUrl, options);
  return mongoDataBase;
};
export { getDatabase };
