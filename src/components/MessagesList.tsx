import firebase from "../firebase/clientApp";
import { collection, getFirestore, onSnapshot, doc } from "firebase/firestore";
import { useEffect, useState, useContext } from "react"
import { Message } from "../types/Messages"
import { AuthContext } from "../contexts/AuthContext";

const db = getFirestore(firebase);

type MessagesListProps = {
  currentConvId: string | null;
}

export default function MessagesList({ currentConvId }: (MessagesListProps)) {
  const authUser = (useContext(AuthContext) as any).user;
  const [messages, setMessages] = useState<Array<Message>>([]);
  const messagesRef = collection(db, "messages");

  useEffect(() => {
    onSnapshot(messagesRef, (snapshot) => {
      if (currentConvId !== null) {
        const result = snapshot.docs
          .filter((doc) => doc.data().convID === currentConvId)
          .map(doc => {
            return {
              id: doc.id,
              convID: doc.data().convID,
              content: doc.data().content,
              createdAt: doc.data().createdAt,
              userID: doc.data().userID
            }
          })
        setMessages(result)
      }
    })
  }, [currentConvId])

  const isOwnMessage = (userID: string) => {
    return userID === authUser.uid
      ? " self-end bg-blue-700 hover:bg-blue-500" // if yours
      : " self-start bg-green-700 hover:bg-green-500" // else
  }

  return (
    <div className="ml-80 min-h-full flex flex-col-reverse justify-start items-center pb-10">
      {/* ml-80: the sidebar covers this component otherwise, should be fixed with a flex or smth 
          min-h-full: css height is a bit to big, since the header takes some space

          <div className={"py-2 px-4 m-1 rounded-lg text-white" + isOwnMessage(true)}>Réponse!</div>
      <div className={"py-2 px-4 m-1 rounded-lg text-white" + isOwnMessage(false)}>Question?</div>
      */}
      {messages.length && messages.map(message => <div
        className={"py-2 px-4 m-1 rounded-lg text-white" + isOwnMessage(message.userID)}
        key={message.id}
      >
        {message.content}
      </div>)}
    </div>
  )
}
