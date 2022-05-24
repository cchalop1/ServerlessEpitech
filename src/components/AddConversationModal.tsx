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

  const [users, setUsers] = useState<Array<User>>([]);
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.fontWeight = 'bold';
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <button onClick={openModal}>Create a conversation</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Create a conversation</h2>
          <button className="close" onClick={closeModal}>&times;</button>
        </div>
        <form>
          <div className="flex">
            <input
              className="appearance-none rounded-none relative block w-half px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Conversation name"
              type="text">
            </input>
          </div>
          <div className="flex">
            <AutoCompleteUserList users={users} setUsers={setUsers}/>
          </div>
          <li>
            {users.map((user, index) => (
              <ul key={index}>
                {user.username}
              </ul>
             ))}
          </li>
          <input type="button" />
        </form>
      </Modal>
    </div>
  );
};

export default AddConversationModale;
