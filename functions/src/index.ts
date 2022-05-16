import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import { UserRecord } from "firebase-functions/v1/auth";

const app = admin.initializeApp();
const db = admin.firestore(app);

export const createUserDocument = functions.auth
  .user()
  .onCreate((user: UserRecord) => {
    db.collection("users")
      .doc(user.uid)
      .set({ email: user.email, username: "" });
  });

export const deleteUserDocument = functions.auth
  .user()
  .onDelete((user: UserRecord) => {
    db.collection("users").doc(user.uid).delete();
  });
