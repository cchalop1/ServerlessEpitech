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
    await db.collection("roles").doc(user.uid).set({ value: "user" });
  });

export const deleteUserDocument = functions.auth
  .user()
  .onDelete(async (user: UserRecord) => {
    await db.collection("users").doc(user.uid).delete();
    await db.collection("roles").doc(user.uid).delete();
  });

export const addNotificationOnAddMessage = functions.firestore
  .document("messages/{messageId}")
  .onCreate(async (change, context) => {
    const newMessage = change.data();
    const conversation = await db.collection("conversations").doc(newMessage.convID).get();
    const userListId = Object.keys(conversation.data()?.users).filter((x) => x !== newMessage.user.uid);

    userListId.forEach(async (x, idx) => {
      const notificationBody = {
        createdAt: Date.now(),
        message: newMessage,
        notifiedUserId: x,
        read: false,
      };

      await db.collection("notifications").add(notificationBody);
    });

  });