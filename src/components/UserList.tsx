import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import { db } from "../firebase/clientApp";
import UserCard from "./UserCard";
import { AuthContext } from "../contexts/AuthContext";
import { useDocument } from "react-firebase-hooks/firestore";
import { Groups } from "../types/Groups";

const UserList = () => {
  const authUser = (useContext(AuthContext) as any).user;
  const usersCollection = collection(db, "users");

  const [users, setUsers] = useState<Array<User>>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const getRolesUsers = async (roles: "Admin" | "Manager" | "User") => {
    const ref = doc(db, "Groups", roles);

    const res = await getDoc(ref);
    if (!res) {
      throw Error("for fetch roles " + roles);
    }
    const data = res.data() as Groups;
    if (!data) {
      throw Error("for fetch data " + roles);
    }
    return data.users;
  };

  const findUserRole = async (userId: string) => {
    const admis = await getRolesUsers("Admin");
    const managers = await getRolesUsers("Manager");
    const users = await getRolesUsers("User");

    if (admis.includes(userId)) return "Admin";
    if (managers.includes(userId)) return "Manager";
    if (users.includes(userId)) return "User";
    return "";
  };

  useEffect(() => {
    onSnapshot(usersCollection, async (snapshot) => {
      const result = snapshot.docs.map(async (doc) => {
        const data = doc.data();
        return {
          uid: doc.id,
          role: await findUserRole(doc.id),
          ...data,
        } as User;
      });
      setUsers(await Promise.all(result));
    });
    getRolesUsers("Admin").then((value) => {
      setIsAdmin(value.includes(authUser.uid));
    });
  }, []);

  return (
    <div className="ml-28 w-1/3">
      {users
        .filter((user) => user.uid !== authUser.uid)
        .map((user, idx) => (
          <UserCard user={user} key={idx} isAdmin={isAdmin} />
        ))}
    </div>
  );
};
export default UserList;
