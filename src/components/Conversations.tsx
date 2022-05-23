import firebase, { db } from "../firebase/clientApp";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { collection, getFirestore, onSnapshot, doc } from "firebase/firestore";

import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import { FaUserPlus } from "react-icons/fa";
import { GiMagnifyingGlass } from "react-icons/gi";

import "react-pro-sidebar/dist/css/styles.css";
import "./Conversations.css";

import { useContext, useEffect, useState } from "react";
import { Conversation } from "../types/Conversation";
import { AuthContext } from "../contexts/AuthContext";
import { useDocument } from "react-firebase-hooks/firestore";

type ConversationProps = {
  setCurrentConvId: any;
};

const Conversations = ({ setCurrentConvId }: ConversationProps) => {
  const authUser = (useContext(AuthContext) as any).user;
  const conversationsRef = collection(db, "conversations");
  const navigate = useNavigate();
  const [conversations, setConversation] = useState<Array<Conversation>>([]);
  const userDoc = doc(db, "roles", authUser.uid);
  const [userRole, loadingRole, errorRole] = useDocument(userDoc);

  if (!loadingRole && !authUser) {
    navigate("/login", { replace: true });
    return <div></div>;
  }

  const handleCreateConv = () => {
    console.log("Create conversation");
  };

  useEffect(() => {
    onSnapshot(conversationsRef, (snapshot) => {
      const result = snapshot.docs
        .filter((doc) => doc.data().users[authUser.uid] === true)
        .map((doc) => {
          return {
            id: doc.id,
            name: doc.data().name,
            icon: doc.data().name,
            users: doc.data().users,
            userId: doc.data().userId,
          };
        });
      setConversation(result);
    });
  }, [authUser]);

  if (loadingRole) {
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
                <MenuItem
                  onClick={() => setCurrentConvId(conv.id)}
                  key={idx}
                  icon={<GiMagnifyingGlass />}
                >
                  {conv.name}
                </MenuItem>
              ))}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            {userRole?.data()?.value === "admin" ||
            userRole?.data()?.value === "manager" ? (
              <Menu iconShape="square">
                <MenuItem
                  onClick={() => handleCreateConv()}
                  icon={<FaUserPlus />}
                >
                  Create a conversation
                </MenuItem>
              </Menu>
            ) : (
              <></>
            )}
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Conversations;
