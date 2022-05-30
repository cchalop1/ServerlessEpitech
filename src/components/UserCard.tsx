import {
  arrayRemove,
  arrayUnion,
  doc,
  FieldValue,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { User } from "../types/User";
import { db } from "../firebase/clientApp";
import { Groups } from "../types/Groups";

type UserCardProps = {
  user: User;
  isAdmin: boolean;
};

const defaultRoles = ["Admin", "Manager", "User"];

const UserCard = ({ user, isAdmin }: UserCardProps) => {
  const updateGroupsDoc = async (groups: string, array: FieldValue) => {
    const rolesDoc = doc(db, "Groups", groups);
    const res = await getDoc(rolesDoc);
    const data = res.data() as Groups;
    if (!data) {
      return;
    }
    await updateDoc(rolesDoc, {
      users: array,
    });
  };

  const handleRolesChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    await updateGroupsDoc(e.target.value, arrayUnion(user.uid));
    defaultRoles
      .filter((r) => r !== e.target.value)
      .forEach(async (r) => {
        await updateGroupsDoc(r, arrayRemove(user.uid));
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
        {defaultRoles.map((option, idx) => {
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
