import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import AutoCompleteUserList from "./AutocompleteUserList";
import { User } from "../types/User";

import {
  collection,
  getFirestore,
  onSnapshot,
  doc,
  addDoc,
} from "firebase/firestore";

import { useContext, useEffect, useState } from "react";
import { Conversation } from "../types/Conversation";
import { AuthContext } from "../contexts/AuthContext";
import { useDocument } from "react-firebase-hooks/firestore";

const db = getFirestore(firebase);

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const AddConversationModale = () => {
  let subtitle : any;
  const authUser = (useContext(AuthContext) as any).user;
  const navigate = useNavigate();
  const conversationRef = collection(db, "conversations");
  const [users, setUsers] = useState<Array<User>>([]);
  const [name, setName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.fontWeight = 'bold';
  }

  const closeModal = () => {
    setIsOpen(false);

    setUsers([]);
    setName("");
  }

  const onClick = (user: User) => {
    const newUserList = users.filter((current) => current.uid !== user.uid);

    setUsers(newUserList);
  }

  const onSubmit = () => {
    let userMap = new Map();
    (users.concat(authUser)).forEach((doc) => {
      userMap.set(doc.uid, true);
    });

    addDoc(conversationRef, {
      name: name,
      userId: authUser.uid,
      icon: "/",
      users: Object.fromEntries(userMap),
    }).then((e) => {
      console.log("OK");
      closeModal();
    }).catch((e) => {
      console.error(e);
    });
  }

  return (
    <div className="flex justify-content">
      <button onClick={openModal}>Create a conversation</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create a conversation</h2>
          <button className="close text-base font-medium rounded-lg p-1 bg-amber-300 text-white" onClick={closeModal}>&times;</button>
        </div>
        <div className="flex">
          <input
            className="appearance-none rounded-none relative block w-half px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Conversation name"
            onChange={(e) => setName(e.target.value)}
            type="text">
          </input>
        </div>
        <div className="flex">
          <AutoCompleteUserList users={users} setUsers={setUsers}/>
        </div>
        <div className="flex justify-between">

          {users.map((user, index) => (

            <div key={index}  className="flex">
              <img
                className="h-12 w-12 rounded-full cursor-pointer"
                onClick={() => onClick(user)}
                src={
                  user.imageUrl
                    ? user.imageUrl
                    : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
                }
              />
              <div className="ml-4">
                <div className="font-bold">{user.username}</div>
                <div>{user.email}</div>
              </div>
            </div>
              
          ))}

            
        </div>
        <footer className="relative h-56 w-128">
          <input className="text-base font-medium rounded-lg p-3 bg-sky-500 text-white absolute bottom-0 right-0 h-16 w-16" type="submit" value="Send" onClick={() => onSubmit()} ></input>
        </footer>
      </Modal>
    </div>
  );
};

export default AddConversationModale;
