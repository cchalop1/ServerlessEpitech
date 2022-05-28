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
  getDoc,
  updateDoc,
  deleteDoc,
  where,
  getDocs,
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

type UpdateModalProps = {
  currentConvId: any;
};

const UpdateConversationModale = ({ currentConvId }: UpdateModalProps) => {
  let subtitle: any;
  const authUser = (useContext(AuthContext) as any).user;
  const navigate = useNavigate();
  const conversationRef = collection(db, "conversations");
  const usersRef = collection(db, "users");
  const [conv, setConv] = useState<Conversation>();
  const [users, setUsers] = useState<Array<User>>([]);
  const [name, setName] = useState("");
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.fontWeight = 'bold';
  }

  const closeModal = () => {
    setIsOpen(false);
  }

  const onDelete = () => {
    if (window.confirm("Are you sure you want to delete this conversation ?")) {
      const convDoc = doc(db, "conversations", currentConvId);

      deleteDoc(convDoc).then((res) => {
        setIsOpen(false);
      }).catch((e) => {
        console.error(e);
      })
    }
  }

  const onClick = (user: User) => {
    const newUserList = users.filter((current) => current.uid !== user.uid);

    setUsers(newUserList);
  }

  const onSubmit = () => {
    let userMap = new Map();
    const convDoc = doc(db, "conversations", currentConvId);
    (users.concat(authUser)).forEach((doc) => {
      userMap.set(doc.uid, true);
    });

    updateDoc(convDoc, {
      name: name,
      users: Object.fromEntries(userMap),
    }).then((e) => {
      closeModal();
    }).catch((e) => {
      console.error(e);
    });
  }

  useEffect(() => {
    onSnapshot(conversationRef, (snapshot) => {
      const result = snapshot.docs.filter((x) => x.id === currentConvId)[0]?.data();
      if (result) {
        const users = Object.keys(result?.users);
        let userList: Array<User> = [];

        users.forEach((x: string) => {
          const usersDoc = doc(usersRef, x);
          getDoc(usersDoc).then((e) => {
            const currentUser: User = {
              uid: e.id,
              email: e.data()?.email,
              username: e.data()?.username,
              imageUrl: e.data()?.imageUrl,
              role: "user",
            }
            userList.push(currentUser);
          });
        });

        setConv({ id: currentConvId, userId: result.userId, icon: result.icon, name: result.name, users: result.users });
        setName(result.name);
        setUsers(userList);
      }
    });
  }, [authUser]);

  return (
    <div className="flex justify-content">
      <button onClick={openModal}>Edit</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div>
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Update a conversation</h2>
          <button className="close text-base font-medium rounded-lg p-1 bg-amber-300 text-white" onClick={closeModal}>&times;</button>
        </div>
        <div className="pt-2">
          <input
            className="appearance-none rounded-none relative block w-half px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            placeholder="Conversation name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            type="text">
          </input>
        </div>
        <div className="pt-2">
          <AutoCompleteUserList users={users} setUsers={setUsers} />
        </div>
        <div className="flex justify-between pt-2">

          {users.map((user, index) => (

            <div key={index} className="flex">
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
        <footer className="pb-2 place-items-end ">
          <input className="text-base font-medium rounded-lg p-3 bg-sky-500 text-white absolute bottom-0 right-0 h-16 w-16" type="submit" value="Send" onClick={() => onSubmit()} ></input>
          <input className="text-base font-medium rounded-lg p-3 bg-red-500 text-white absolute bottom-0 right-20 h-16 w-16" type="submit" value="Delete" onClick={() => onDelete()} ></input>
        </footer>
      </Modal>
    </div>
  );
};

export default UpdateConversationModale;
