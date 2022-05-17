import firebase from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import {
  collection,
  getFirestore,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';

import { FiHome, FiLogOut } from "react-icons/fi";
import { GiMagnifyingGlass } from "react-icons/gi";

import "react-pro-sidebar/dist/css/styles.css";
import "./Conversations.css";

import { useEffect, useState } from "react";
import { Conversation } from "../types/Conversation";

const db = getFirestore(firebase);

const Conversations = () => {
  const conversationsRef = collection(db, "conversations");
  const navigate = useNavigate();
  const [data, setData] = useState<string>("");
  const [conversations, setConversation] = useState<Array<Conversation>>([]);
  const [user, loading, error] = useAuthState(getAuth(firebase));

  if (!loading && !user) {
    navigate("/login", { replace: true });
    return <div></div>;
  }

  const handleConvClick = (convId: String) => {
    console.log(convId);
  };

  useEffect(() => {
    onSnapshot(conversationsRef, (snapshot) => {
      const result = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          name: doc.data().name,
          icon: doc.data().name,
          users: doc.data().users,
          userId: doc.data().userId,
        };
      });
      console.log(result);
      setConversation(result);
    });
  }, []);



  if (error) {
    return (
      <div>
        <p>Error: {error.message}</p>
      </div>
    );
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div id="sidebar">
        <ProSidebar collapsed={false}>
          <SidebarHeader>
            <div className="logotext">
              <p>{"Conversations"}</p>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <Menu iconShape="square">

              {conversations.map((conv, idx) => (
                <MenuItem onClick={() => handleConvClick(conv.id)} key={idx} icon={<GiMagnifyingGlass />}>{conv.name}</MenuItem>
              ))}

            </Menu>
          </SidebarContent>
          <SidebarFooter>
            <Menu iconShape="square">
              <MenuItem icon={<FiLogOut />}>Logout</MenuItem>
            </Menu>
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>

  );
};

export default Conversations;
