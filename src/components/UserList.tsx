import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import firebase, { db } from "../firebase/clientApp";
import UserCard from "./UserCard";
import { AuthContext } from "../contexts/AuthContext";
import { useDocument } from "react-firebase-hooks/firestore";

const UserList = () => {
  const authUser = (useContext(AuthContext) as any).user;
  const usersRef = collection(db, "users");
  const rolesRef = collection(db, "roles");

  const userDoc = doc(db, "roles", authUser.uid);
  const [userRole, loading, error] = useDocument(userDoc);

  const [users, setUsers] = useState<Array<User>>([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
        setUsers(result);
      });
    });
    if (userRole) {
      setIsAdmin(userRole.data()?.value === "admin");
    }
  }, [userRole]);

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
