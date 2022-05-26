import React, {useContext, useEffect, useRef, useState} from "react";
import firebase, {storage} from "../firebase/clientApp";

import {addDoc, collection, doc, getFirestore, serverTimestamp, updateDoc} from "firebase/firestore";
import {AuthContext} from "../contexts/AuthContext";
import {User} from "../types/User";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

const db = getFirestore(firebase);

type InputFileProps = {currentConvId: string}

const InputFile = (props: InputFileProps) => {
    const inputFileRef = useRef<HTMLInputElement>(null);

    const authUser = useContext(AuthContext) as any;

    const uploadFile = async (imageUpload: FileList | null) => {
        console.log(FileList)
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