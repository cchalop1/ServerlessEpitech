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
import AddConversationModale from "./AddConversationModal";
import UpdateConversationModale from "./UpdateConversationModal";

type ConversationProps = {
  setCurrentConvId: any;
};

const Conversations = ({ setCurrentConvId }: ConversationProps) => {
  const authUser = (useContext(AuthContext) as any).user;
  const conversationsRef = collection(db, "conversations");
  const navigate = useNavigate();
  const [conversations, setConversation] = useState<Array<Conversation>>([]);
  const userGroupsRef = doc(db, "Groups", "User");
  const [usersGroups] = useDocument(userGroupsRef);

  if (!authUser) {
    navigate("/login", { replace: true });
    return <div></div>;
  }

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

  return (
    <>
      <div className="" id="sidebar">
        <ProSidebar collapsed={false}>
          <SidebarHeader>
            <div className="logotext">
              <p>{"Conversations"}</p>
            </div>
          </SidebarHeader>
          <SidebarContent className="overflow-y-auto">
            <Menu iconShape="square">
              {conversations.map((conv, idx) => (
                <div className="row" key={idx}>
                  <MenuItem
                    onClick={() => setCurrentConvId(conv.id)}
                    icon={<GiMagnifyingGlass />}
                  >
                    <div>{conv.name}</div>
                    {authUser.uid === conv.userId ? (
                      <UpdateConversationModale currentConvId={conv.id} />
                    ) : (
                      <></>
                    )}
                  </MenuItem>
                </div>
              ))}
            </Menu>
          </SidebarContent>
          <SidebarFooter>
            {!usersGroups?.data()?.users.includes(authUser.uid) && (
              <Menu iconShape="square">
                <MenuItem icon={<FaUserPlus />}>
                  <p>Create a conversation</p>
                  <AddConversationModale></AddConversationModale>
                </MenuItem>
              </Menu>
            )}
          </SidebarFooter>
        </ProSidebar>
      </div>
    </>
  );
};

export default Conversations;
