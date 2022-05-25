import React, {useContext, useEffect, useState} from "react";
import firebase from "../firebase/clientApp";

import {addDoc, collection, doc, getFirestore, serverTimestamp} from "firebase/firestore";
import {AuthContext} from "../contexts/AuthContext";
import {useDocument} from "react-firebase-hooks/firestore";
import {User} from "../types/User";

const db = getFirestore(firebase);

type InputMessageProps = {currentConvId: string}

const InputMessage = (props : InputMessageProps) => {
  const messagesRef = collection(db, "messages");
  const [messageInput, setMessageInput] = useState<string>("");
  const authUser = useContext(AuthContext) as any;

  const userDoc = doc(db, "users", authUser.user.uid);
  const [user, loading, error] = useDocument(userDoc);
  const [userData, setUserData] = useState<User | null>(null);

  useEffect(() => {
    if (user) {
      setUserData(user.data() as User);
    }
  }, [user]);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   const newMessage = {
     content: messageInput,
     convID: props.currentConvId,
     createdAt: serverTimestamp(),
     user: {...userData, uid: user?.id}
    }
    setMessageInput("");
    await addDoc(messagesRef, newMessage);
  };

  return (
    <div id="input-message" className="justify-self-end pb-4 shadow-lg">
      <form onSubmit={submit}>
        { messageInput.length == 0 ? (
            <input className="w-full border-2 border-grey border-solid rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-lg"
                   placeholder="Enter your message"
                   value={messageInput}
                   onChange={(e) => setMessageInput(e.target.value)}
            ></input>
        ) : (
            <input className="w-full border-2 border-blue border-solid rounded-tl-lg rounded-tr-lg rounded-br-lg rounded-bl-lg"
                   placeholder="Enter your message"
                   value={messageInput}
                   onChange={(e) => setMessageInput(e.target.value)}
            ></input>
        )}
      </form>
    </div>
  );
};

export default InputMessage;
