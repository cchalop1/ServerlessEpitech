import firebase from "../firebase/clientApp";
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { Message } from "../types/Messages";

const db = getFirestore(firebase);

const Messages = () => {
  const messagesRef = collection(db, "messages");
  const [data, setData] = useState<string>("");
  const [messages, setMessage] = useState<Array<Message>>([]);

  useEffect(() => {
    onSnapshot(messagesRef, (snapshot) => {
      const result = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          content: doc.data().content,
          createAt: doc.data().createAt,
        };
      });
      setMessage(result);
    });
  }, []);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addDoc(messagesRef, {
      content: data,
      createAt: serverTimestamp(),
    });
    setData("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <input
          name="content"
          type="text"
          value={data}
          onChange={(e) => setData(e.target.value)}
        ></input>
        <button type="submit">Send</button>
      </form>
      {messages.map((m, idx) => (
        <div key={idx}>{m.content}</div>
      ))}
    </div>
  );
};

export default Messages;
