import React, {useContext, useEffect, useRef, useState} from "react";
import firebase, {storage, db} from "../firebase/clientApp";

import {addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc} from "firebase/firestore";
import {AuthContext} from "../contexts/AuthContext";
import {User} from "../types/User";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {useDocument} from "react-firebase-hooks/firestore";


type InputFileProps = {currentConvId: string}

const InputFile = (props: InputFileProps) => {
    const inputFileRef = useRef<HTMLInputElement>(null);
    const authUser = useContext(AuthContext) as any;

    const [userData, setUserData] = useState<User | null>(null);
    const userDoc = doc(db, "users", authUser.user.uid);
    const [user, loading, error] = useDocument(userDoc);
    const fileDoc = collection(db, "files");

    useEffect(() => {
        if (user) {
            setUserData(user.data() as User);
        }
    }, [user]);

    const uploadFile = async (fileUpload: FileList | null) => {
        if (!fileUpload || fileUpload.length !== 1) {
            return;
        }
        if (!userData) return;
        const fileRef = ref(
            storage,
            `files/${authUser.user.uid}/file-${Math.random().toString(36).slice(2, 7) }.pdf`
        );
        const res = await uploadBytes(fileRef, fileUpload[0]);
        console.log(res);
        const urlResult = await getDownloadURL(fileRef);
        const newImage = {
            fileUrl: urlResult,
            convID: props.currentConvId,
            createdAt: serverTimestamp(),
            user: {...userData, uid: user?.id}
        }
        await addDoc(fileDoc, newImage);
    };

    return(
        <div className={"justify-self-end pb-4"}>
            <img
                alt={"input-file"}
                onClick={() => inputFileRef.current && inputFileRef.current.click()}
                height={"30"}
                width={"30"}
                src={"https://findicons.com/files/icons/1579/devine/48/file.png"}/>
            <input
                hidden
                ref={inputFileRef}
                type="file"
                accept=".pdf"
                onChange={(e) => uploadFile(e.target.files)}
            ></input>
        </div>
    );
}

export default InputFile