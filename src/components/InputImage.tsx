import React, {useContext, useEffect, useRef, useState} from "react";
import firebase, {storage} from "../firebase/clientApp";

import {addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc} from "firebase/firestore";
import {AuthContext} from "../contexts/AuthContext";
import {User} from "../types/User";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

const db = getFirestore(firebase);

type InputImageProps = {currentConvId: string}

const InputImage = (props: InputImageProps) => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const authUser = useContext(AuthContext) as any;

    const uploadFile = async (imageUpload: FileList | null) => {
        console.log(FileList)
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
                onChange={(e) => uploadFile(e.target.files)}
            ></input>
        </div>
    );
}

export default InputImage