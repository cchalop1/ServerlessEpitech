import { getAuth, User as AuthUser } from "firebase/auth";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";

import { CheckIcon, PencilIcon } from "@heroicons/react/outline";

import firebase from "../firebase/clientApp";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";

const db = getFirestore(firebase);
const storage = getStorage(firebase);

const Profile = () => {
  const authUser = useContext(AuthContext) as AuthUser;

  const inputFileRef = useRef<HTMLInputElement>(null);

  const userDoc = doc(db, "users", authUser.uid);
  const [user, loading, error] = useDocument(userDoc);
  const [userData, setUserData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData(user.data() as User);
    }
  }, [user]);

  const uploadFile = async (imageUpload: FileList | null) => {
    if (!imageUpload || imageUpload.length !== 1) {
      return;
    }
    if (!userData) return;
    const imageRef = ref(storage, `profilePicture/${authUser.uid}/profile.jpg`);
    const res = await uploadBytes(imageRef, imageUpload[0]);
    console.log(res);
    const urlResult = await getDownloadURL(imageRef);
    await updateDoc(userDoc, {
      imageUrl: urlResult,
    });
  };

  const handleIsEditing = async () => {
    if (isEditing) {
      await updateDoc(userDoc, userData);
    }
    setIsEditing(!isEditing);
  };

  if (!userData || loading) {
    return <div>loading...</div>;
  }
  if (error) {
    return <div>error: {error.message}</div>;
  }
  return (
    <div className="h-screen flex justify-center items-center flex-col">
      <div className="rounded-xl pl-8 pr-8 pt-4 pb-4 w-1/3 border">
        <div className="flex justify-between mb-2">
          <div className="text-xl">Profile</div>
          {!isEditing ? (
            <div className="h-7 w-7 cursor-pointer hover:bg-neutral-100 p-1 rounded-3xl flex justify-center items-center">
              <PencilIcon className="h-5 w-5" onClick={handleIsEditing} />
            </div>
          ) : (
            <div className="h-7 w-7 cursor-pointer hover:bg-neutral-100 p-1 rounded-3xl flex justify-center items-center">
              <CheckIcon
                className="h-5 w-5 cursor-pointer"
                onClick={handleIsEditing}
              />
            </div>
          )}
        </div>
        <div className="flex">
          <div>
            <img
              className="h-20 w-20 rounded-full cursor-pointer"
              src={userData.imageUrl}
              onClick={() =>
                inputFileRef.current && inputFileRef.current.click()
              }
            />
            <input
              hidden
              ref={inputFileRef}
              type="file"
              accept=".jpg,.jpeg"
              onChange={(e) => uploadFile(e.target.files)}
            ></input>
          </div>
          <div>
            <div>{userData.email}</div>
            <div>{userData.roles}</div>
            {isEditing ? (
              <input
                type="text"
                id="username"
                placeholder="Username"
                value={userData.username}
                onChange={(e) =>
                  setUserData({ ...userData, username: e.target.value })
                }
              />
            ) : (
              <div>{userData.username}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
