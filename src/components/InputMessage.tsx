import React from "react";
import firebase from "../firebase/clientApp";

import {collection, getFirestore, onSnapshot, doc, addDoc, serverTimestamp} from "firebase/firestore";

const db = getFirestore(firebase);

const InputMessage = () => {
    const messagesRef = collection(db, "messages");

    const submit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
                <textarea value="test"></textarea>
            </form>
        </div>
    );
}

export default InputMessage