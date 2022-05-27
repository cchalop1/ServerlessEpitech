import React, {useContext, useEffect, useRef, useState} from "react";
import firebase, {storage, db} from "../firebase/clientApp";

import {addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc} from "firebase/firestore";
import {AuthContext} from "../contexts/AuthContext";
import {User} from "../types/User";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {useDocument} from "react-firebase-hooks/firestore";

type InputImageProps = {currentConvId: string}

const InputImage = (props: InputImageProps) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const authUser = useContext(AuthContext) as any;

    const [userData, setUserData] = useState<User | null>(null);
    const userDoc = doc(db, "users", authUser.user.uid);
    const [user, loading, error] = useDocument(userDoc);
    const pictureDoc = collection(db, "pictures");

    useEffect(() => {
        if (user) {
            setUserData(user.data() as User);
        }
    }, [user]);

    const uploadImage = async (imageUpload: FileList | null) => {
        console.log(imageUpload)
        if (!imageUpload || imageUpload.length !== 1) {
            return;
        }
        if (!userData) return;
        const imageRef = ref(
            storage,
            `pictures/${authUser.user.uid}/image-${Math.random().toString(36).slice(2, 7) }.jpg`
        );
        console.log(imageRef)
        const res = await uploadBytes(imageRef, imageUpload[0]);
        console.log(res);
        const urlResult = await getDownloadURL(imageRef);
        const newImage = {
            imageUrl: urlResult,
            convID: props.currentConvId,
            createdAt: serverTimestamp(),
            user: {...userData, uid: user?.id}
        }
        await addDoc(pictureDoc, newImage);
    };

    return(
        <div className={"justify-self-end pb-4"}>
            <img
                alt={"input-image"}
                onClick={() => inputFileRef.current && inputFileRef.current.click()}
                height={"30"}
                width={"30"}
                src={"https://icons.iconarchive.com/icons/icons8/windows-8/512/Files-Png-icon.png"}/>
            <input
                hidden
                ref={inputFileRef}
                type="file"
                accept=".jpg, .jpeg"
                onChange={(e) => uploadImage(e.target.files)}
            ></input>
        </div>
    );
}

export default InputImage