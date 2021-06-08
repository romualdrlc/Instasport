//import { MongoClient } from "mongodb";
// const getDatabase = async () => {
//   const databaseUrl = process.env.MONGODB_URI;
//   const options = { useNewUrlParser: true, useUnifiedTopology: true };
//   const mongoDataBase = await MongoClient.connect(databaseUrl, options);
//   return mongoDataBase;
// };
import { getDatabase } from "./mongodb";

///////////////////////////
/////// insertUser ///////
//////////////////////////

// const insertUser = async (token: string, date: Date, email: any) => {
//   try {
//     (await getDatabase())
//       .db("instasportDB")
//       .collection("user")
//       .insertOne({
//         email: email,
//         cookie: { token: token, expdate: date },
//       });
//   } catch (e) {
//     console.log(e);
//   }
// };
const insertUser = async (token: string, date: Date, email: any) => {
  try {
    (await getDatabase())
      .db("instasportDB")
      .collection("user")
      .updateOne(
        {
          email: email,
        },
        {
          $set: {
            cookie: { token: token, expdate: date },
            email: email,
          },
        },
        { upsert: true }
      );
  } catch (e) {
    console.log(e);
  }
};

// const insertUser = async (token: string, date: Date, email: any) => {
//   let searchResult;
//   try {
//     searchResult = (await getDatabase())
//       .db("instasportDB")
//       .collection("user")
//       .findOne({
//         email: email,
//       });
//   } catch (e) {
//     console.log(e);
//   }

//   if (await searchResult) {
//     updateToken(token, date, email);
//   } else {
//     try {
//       (await getDatabase())
//         .db("instasportDB")
//         .collection("user")
//         .insertOne({
//           cookie: { token: token, expdate: date },
//           email: email,
//         });
//     } catch (e) {
//       console.log(e);
//     }
//   }
// };

///////////////////////////
////// updateToken ///////
//////////////////////////
const updateToken = async (newToken: string, date: Date, email: any) => {
  try {
    (await getDatabase())
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

///////////////////////////
////// isEmailFound //////
//////////////////////////
const isEmailFound = async (email: any) => {
  let result;

  try {
    result = (await getDatabase())
      .db("instasportDB")
      .collection("user")
      .findOne({
        email: email,
      });
  } catch (e) {
    console.log(e);
  }

  return (await result) != null;
};

///////////////////////////
//// getUserByCookie ////
//////////////////////////
const getUserByCookie = async (cookie: any) => {
  let result;
  try {
    result = (await getDatabase())
      .db("instasportDB")
      .collection("user")
      .findOne({
        "cookie.token": cookie,
      });
  } catch (e) {
    console.log(e);
  }
  const foundUser = await result;
  console.log("🟠", foundUser);
  return foundUser ? foundUser : "";
};

///////////////////////////
///// CreateNewUser //////
//////////////////////////
const completeCreationNewUser = async (data: any) => {
  try {
    const result = (await getDatabase())
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
const getDefaultUsers = async () => {
  try {
    const result = (await getDatabase())
      .db("instasportDB")
      .collection("user")
      .find({ id: { $exists: true } })
      .toArray();

    return result;
  } catch (e) {
    console.log(e);
  }
};

const getSportCategories = async () => {
  try {
    const result = (await getDatabase())
      .db("instasportDB")
      .collection("group")
      .find()
      .toArray();

    return result;
  } catch (e) {
    console.log(e);
  }
};

const getComment = async (data: any) => {
  const d = new Date();
  const date = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();

  try {
    const result = (await getDatabase())
      .db("instasportDB")
      .collection("posts")
      .insertOne({
        commentsPost: [data.commentsPost],
        datePost: date,
        likePost: [],
      });
    return result;
  } catch (e) {
    console.log(e);
  }
};

const getLike = async (data: any) => {
  try {
    const result = (await getDatabase())
      .db("instasportDB")
      .collection("posts")
      .updateOne(
        {
          likePost: data.like,
          id: data.id,
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

const getSearch = async (data: any) => {
  const regex2 = new RegExp(data.searchValue, "i");
  const arrayData = [regex2];
  try {
    const result = (await getDatabase())
      .db("instasportDB")
      .collection("user")
      .find({ userName: { $in: arrayData } })
      .toArray();
    console.log("result", await result);
    return result;
  } catch (e) {
    console.log(e);
  }
};

///////////////////////////
//////// Export //////////
//////////////////////////
export {
  insertUser,
  updateToken,
  isEmailFound,
  getUserByCookie,
  completeCreationNewUser,
  getComment,
  getLike,
  getDefaultUsers,
  getSportCategories,
  getSearch,
};
