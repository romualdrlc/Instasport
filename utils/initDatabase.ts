import { MongoClient } from "mongodb";
const initDB = async () => {
  const databaseUrl = process.env.MONGODB_URI;
  const options = { useNewUrlParser: true, useUnifiedTopology: true };
  const mongoDataBase = await MongoClient.connect(databaseUrl, options);
  return mongoDataBase;
};

const insertUser = async (token: string, date: Date, email: any) => {
  try {
    (await initDB())
      .db("instasportDB")
      .collection("user")
      .insertOne({
        cookie: { token: token, expdate: date },
        email: email,
      });
  } catch (e) {
    console.log(e);
  }
};

const updateToken = async (newToken: string, date: Date, email: any) => {
  try {
    (await initDB())
      .db("instasportDB")
      .collection("user")
      .updateOne(
        {
          email: email,
        },
        { $set: { cookie: { token: newToken, expdate: date } } }
      );
  } catch (e) {
    console.log(e);
  }
};

const isEmailFound = async (email: any) => {
  let result;

  try {
    result = (await initDB()).db("instasportDB").collection("user").findOne({
      email: email,
    });
  } catch (e) {
    console.log(e);
  }

  return (await result) != null;
};

const getEmailByCookie = async (cookie: any) => {
  let result;
  try {
    result = (await initDB()).db("instasportDB").collection("user").findOne({
      "cookie.token": cookie,
    });
  } catch (e) {
    console.log(e);
  }
  return (await result).email;
};

const createNewUser = async (data: any) => {
  console.log("ligne 77" + data.email);
  try {
    const result = (await initDB())
      .db("instasportDB")
      .collection("user")
      .updateOne(
        {
          email: data.email,
        },
        {
          $set: {
            userName: data.userName,
            Groups: data.active,
            Birthdate: data.birthdate,
          },
        }
      );
    return result;
  } catch (e) {
    console.log(e);
  }
};

export {
  insertUser,
  updateToken,
  isEmailFound,
  getEmailByCookie,
  createNewUser,
};
