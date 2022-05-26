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
  const [bubbles, setBubbles] = useState<Array<Message | Picture>>([])
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

  useEffect(() => {
    const bubbles = [...pictures, ...messages]
    bubbles.sort((a, b) => b?.createdAt?.seconds - a?.createdAt?.seconds)
    setBubbles(bubbles)
  }, [messages, pictures])

  return (
    <div className="mt-4 flex flex-col-reverse flex-grow overflow-auto justify-start items-center pb-10">
      {bubbles.length && bubbles.map((element, index) => (
          <MessageBubble message={element} ownUID={authUser.uid} hasOwnBefore={index - 1 >= 0 && element.user.uid === bubbles[index - 1].user.uid} key={element.id} />
     ))}
    </div>
  )
}
