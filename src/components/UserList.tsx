import { collection, getFirestore, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import firebase from "../firebase/clientApp";
import UserCard from "./UserCard";
import { AuthContext } from "../contexts/AuthContext";

const db = getFirestore(firebase);

const UserList = () => {
  const authUser = (useContext(AuthContext) as any).user;
  const usersRef = collection(db, "users");
  const rolesRef = collection(db, "roles");
  const [users, setUsers] = useState<Array<User>>([]);

  useEffect(() => {
    onSnapshot(rolesRef, (snapshotRoles) => {
      let roles = new Map<string, string>();
      for (const r of snapshotRoles.docs) {
        roles.set(r.id, r.data().value);
      }
      onSnapshot(usersRef, (snapshot) => {
        const result = snapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            uid: doc.id,
            role: roles.get(doc.id),
            ...data,
          } as User;
        });
        console.log(result);
        setUsers(result);
      });
    });
  }, []);

  return (
    <div className="ml-28 w-1/3">
      {users
        .filter((user) => user.uid !== authUser.uid)
        .map((user, idx) => (
          <UserCard user={user} key={idx} />
        ))}
    </div>
  );
};
export default UserList;
