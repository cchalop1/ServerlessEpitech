import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-functions/v1/auth";

const app = admin.initializeApp();
const db = admin.firestore(app);

export const createUserDocument = functions.auth
  .user()
  .onCreate(async (user: UserRecord) => {
    await db
      .collection("users")
      .doc(user.uid)
      .set({ email: user.email, username: "" });
    let data = (await db.collection("roles").doc("users").get()).data();
    // TODO: fix this part for add user uid to the roles parts
    if (data) {
      let users = data.users;
      users[user.uid] = true;
      await db.collection("roles").doc("users").update(users);
    }
  });

export const deleteUserDocument = functions.auth
  .user()
  .onDelete((user: UserRecord) => {
    db.collection("users").doc(user.uid).delete();
  });
