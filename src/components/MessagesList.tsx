import firebase, { db } from "../firebase/clientApp";
import { collection, getFirestore, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { useEffect, useState, useContext } from "react"
import { Message } from "../types/Messages"
import { MessageBubble } from "./MessageBubble"
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";

type MessagesListProps = {
  currentConvId: string | null;
}

export default function MessagesList({ currentConvId }: MessagesListProps) {
  const authUser = (useContext(AuthContext) as any).user;
  const [messages, setMessages] = useState<Array<Message>>([]);
  const messagesRef = collection(db, "messages");

  const q = query(messagesRef, where("convID", "==", currentConvId), orderBy("createdAt", "desc"));

  useEffect(() => {
    onSnapshot(q, (snapshot) => {
      const result = snapshot.docs
        .map(doc => {
          return {
            id: doc.id,
            convID: doc.data().convID,
            content: doc.data().content,
            createdAt: doc.data().createdAt,
            user: doc.data().user as User,
            createdTimestamp: doc.data().createdAt.seconds
          }
        })
        console.log(result)
      setMessages(result)
    })
  }, [currentConvId])

  return (
    <div className="min-h-full flex flex-col-reverse justify-start items-center pb-10 overflow-y-auto">
      {/* ml-80: the sidebar covers this component otherwise, should be fixed with a flex or smth 
          min-h-full: css height is a bit to big, since the header takes some space

          <div className={"py-2 px-4 m-1 rounded-lg text-white" + isOwnMessage(true)}>Réponse!</div>
      <div className={"py-2 px-4 m-1 rounded-lg text-white" + isOwnMessage(false)}>Question?</div>
      */}
      {messages.length && messages.map((message, index) => (
        <MessageBubble message={message} ownUID={authUser.uid} hasOwnBefore={index - 1 >= 0 && message.user.uid === messages[index - 1].user.uid} key={message.id} />
      ))}
    </div>
  )
}
