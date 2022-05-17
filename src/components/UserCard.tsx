import { doc, getFirestore, updateDoc } from "firebase/firestore";
import { User } from "../types/User";
import firebase from "../firebase/clientApp";

type UserCardProps = {
  user: User;
  isAdmin: boolean;
};

const db = getFirestore(firebase);

const UserCard = ({ user, isAdmin }: UserCardProps) => {
  const handleRolesChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const rolesDoc = doc(db, "roles", user.uid);
    await updateDoc(rolesDoc, {
      value: e.target.value,
    });
  };

  return (
    <div className="flex justify-between">
      <div className="flex">
        <img
          className="h-12 w-12 rounded-full cursor-pointer"
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
      <select
        className="h-8 bg-white cursor-pointer"
        onChange={handleRolesChange}
        defaultValue={user.role}
        disabled={!isAdmin}
      >
        {["admin", "manager", "user"].map((option, idx) => {
          return (
            <option value={option} key={idx}>
              {option}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default UserCard;
