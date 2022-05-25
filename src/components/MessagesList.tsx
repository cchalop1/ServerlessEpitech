import firebase, { db } from "../firebase/clientApp";
import { collection, getFirestore, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState, useContext } from "react"
import { Message } from "../types/Messages"
import { Picture } from "../types/Pictures";
import { MessageBubble } from "./MessageBubble"
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";

type MessagesListProps = {
  currentConvId: string | null;
}

export default function MessagesList({ currentConvId }: MessagesListProps) {
  const authUser = (useContext(AuthContext) as any).user;
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [pictures, setPictures] = useState<Array<Picture>>([]);
  const messagesRef = collection(db, "messages");
  const picturesRef = collection(db, "pictures");

  const q = query(messagesRef, where("convID", "==", currentConvId), orderBy("createdAt", "desc"));
  const q2 = query(picturesRef, where("convID", "==", currentConvId), orderBy("createdAt", "desc"))

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const messages = snapshot.docs
        .map(doc => {
          return {
            id: doc.id,
            convID: doc.data().convID,
            content: doc.data().content,
            createdAt: doc.data().createdAt,
            user: doc.data().user as User,
          }
        })
      setMessages(messages)
    })
    onSnapshot(q2, (snapshot) => {
      const pictures = snapshot.docs
        .map(doc => {
          return {
            id: doc.id,
            convID: doc.data().convID,
            imageUrl: doc.data().imageUrl,
            createdAt: doc.data().createdAt,
            user: doc.data().user as User,
          }
        })
        setPictures(pictures)
    })
  }, [currentConvId])

  return (
    <div className="min-h-full flex flex-col-reverse justify-start items-center pb-10">
      {messages.length && messages.map((message, index) => (
        <MessageBubble message={message} ownUID={authUser.uid} hasOwnBefore={index - 1 >= 0 && message.user.uid === messages[index - 1].user.uid} key={message.id} />
      ))}
    </div>
  )
}
