import React, { useState } from "react";
import firebase from "../firebase/clientApp";

import { collection, getFirestore } from "firebase/firestore";

const db = getFirestore(firebase);

const InputMessage = () => {
  const messagesRef = collection(db, "messages");
  const [messageInput, setMessageInput] = useState<string>("");

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(messageInput);
    setMessageInput("");
    // await addDoc(messagesRef, {
    //     content: data,
    //     createAt: serverTimestamp(),
    // });
    console.log(e);
    // setData("");
  };

  return (
    <div id="input-message">
      <form onSubmit={submit}>
        <input
          placeholder="test"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
        ></input>
      </form>
    </div>
  );
};

export default InputMessage;
