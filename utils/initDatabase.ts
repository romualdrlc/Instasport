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
          email: data.email1,
        },
        {
          $set: {
            email: data.email2,
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

const logoutUser = async (data: any) => {
  const cookieToken = data.usersToken;
  const currentDate = new Date();
  let result;
  try {
    result = (await getDatabase())
      .db("instasportDB")
      .collection("user")
      .updateOne(
        {
          "cookie.token": cookieToken,
        },
        { $set: { cookie: { token: cookieToken, expdate: currentDate } } }
      );
  } catch (e) {
    console.log(e);
  }
};

const getAllGroups = async () => {
  let result;
  try {
    result = (await getDatabase())
      .db("instasportDB")
      .collection("group")
      .find()
      .toArray();
  } catch (e) {
    console.log(e);
  }
  const foundGroups = await result;
  return foundGroups ? foundGroups : "";
};

const getCommentsByPost = async (id: any) => {
  console.log("ididididididididididiid", id);
  const ObjectId = require("mongodb").ObjectID;
  const idForFilter = ObjectId(id);
  let result;
  try {
    result = (await getDatabase())
      .db("instasportDB")
      .collection("comment")
      .find({
        postId: idForFilter,
      })
      .toArray();
  } catch (e) {
    console.log(e);
  }
  const foundComments = await result;
  console.log("🟠", foundComments);
  return foundComments ? foundComments : "";
};

const getSearchUserById = async (id: any) => {
  console.log("ididididididididididiid", id);
  const ObjectId = require("mongodb").ObjectID;
  const idForFilter = ObjectId(id);
  let result;
  try {
    result = (await getDatabase())
      .db("instasportDB")
      .collection("user")
      .findOne({
        _id: idForFilter,
      });
  } catch (e) {
    console.log(e);
  }
  const foundUser = await result;
  console.log("🟠", foundUser);
  return foundUser ? foundUser : "";
};

const getAllPostsByGroups = async (id: any) => {
  let result;
  try {
    result = (await getDatabase())
      .db("instasportDB")
      .collection("posts")
      .find({
        groupId: parseInt(id),
      })
      .toArray();
  } catch (e) {
    console.log(e);
  }
  const foundPosts = await result;
  console.log(" Posts", foundPosts);
  return foundPosts ? foundPosts : "";
};

const getUsersPhotoByToken = async (data: any) => {
  const cookieToken = data.usersToken;
  let result;
  try {
    result = (await getDatabase())
      .db("instasportDB")
      .collection("user")
      .findOne({
        "cookie.token": cookieToken,
      });
  } catch (e) {
    console.log(e);
  }
  const user = await result;
  return user.Cover;
};

const createPost = async (data: any) => {
  try {
    const result = (await getDatabase())
      .db("instasportDB")
      .collection("posts")
      .insertOne({
        id: data.id,
        userId: data.userId,
        datePost: data.datePost,
        photosPost: data.photosPost,
        textPost: data.textPost,
        likePost: data.likePost,
        commentsPost: data.commentsPost,
        groupId: data.groupId,
        postTitle: data.postTitle,
      });
    return result;
  } catch (e) {
    console.log(e);
  }
};

const createComment = async (data: any) => {
  const ObjectId = require("mongodb").ObjectID;
  const idForFilter = ObjectId(data.postId);
  const idForFilterUser = ObjectId(data.userId);

  try {
    const result = (await getDatabase())
      .db("instasportDB")
      .collection("comment")
      .insertOne({
        idUser: idForFilterUser,
        DateComment: data.DateComment,
        text: data.text,
        postId: idForFilter,
      });

    const result3 = await result;
    console.log("result33333333333", ObjectId(result3.insertedId));

    const result2 = (await getDatabase())
      .db("instasportDB")
      .collection("posts")
      .updateOne(
        {
          _id: idForFilter,
        },
        { $push: { commentsPost: { $each: ["1"] } } }
      );

    console.log("🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠🟠", await result2);
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
  logoutUser,
  getSearchUserById,
  getAllGroups,
  getAllPostsByGroups,
  getUsersPhotoByToken,
  createPost,
  getCommentsByPost,
  createComment,
};
