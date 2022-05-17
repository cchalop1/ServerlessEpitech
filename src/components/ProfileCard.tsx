import { CheckIcon, PencilIcon } from "@heroicons/react/outline";

import { useContext, useEffect, useRef, useState } from "react";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { useDocument } from "react-firebase-hooks/firestore";

import firebase from "../firebase/clientApp";
import { AuthContext } from "../contexts/AuthContext";
import { User } from "../types/User";

const db = getFirestore(firebase);
const storage = getStorage(firebase);

const ProfileCard = () => {
  const inputFileRef = useRef<HTMLInputElement>(null);
  const authUser = useContext(AuthContext) as any;

  const userDoc = doc(db, "users", authUser.user.uid);
  const [user, loading, error] = useDocument(userDoc);
  const [userData, setUserData] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (user) {
      setUserData(user.data() as User);
    }
  }, [user]);

  const handleIsEditing = async () => {
    if (isEditing) {
      try {
        await updateDoc(userDoc, userData);
      } catch (e) {
        console.log(e);
      }
    }
    setIsEditing(!isEditing);
  };

  const uploadFile = async (imageUpload: FileList | null) => {
    if (!imageUpload || imageUpload.length !== 1) {
      return;
    }
    if (!userData) return;
    const imageRef = ref(
      storage,
      `profilePicture/${authUser.user.uid}/profile.jpg`
    );
    const res = await uploadBytes(imageRef, imageUpload[0]);
    console.log(res);
    const urlResult = await getDownloadURL(imageRef);
    await updateDoc(userDoc, {
      imageUrl: urlResult,
    });
  };

  if (!userData) {
    return <></>;
  }
  return (
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
            src={
              userData.imageUrl
                ? userData.imageUrl
                : "https://static.vecteezy.com/system/resources/previews/002/318/271/original/user-profile-icon-free-vector.jpg"
            }
            onClick={() => inputFileRef.current && inputFileRef.current.click()}
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
  );
};

export default ProfileCard;
