import React from "react";
import {useAuth} from "@/context/AuthContext";
import {doc, getDoc, setDoc} from "firebase/firestore";
import {db} from "../../../firebase";
import {useRouter} from "next/navigation";
import {TData} from "@/types/CvTypes";
import {DocumentData} from "@firebase/firestore-types";
import './style.css';

const CopyCvButton = (id: string) => {
  const {currentUser} = useAuth();
  const router = useRouter();
  const docId = (Math.random() + 1).toString(36).substring(2);
  const handleCopyCv = async () => {
    //@ts-ignore
    const docRef = doc(db, currentUser.email, id.id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const newData: TData | DocumentData = docSnap.data()
      console.log(newData);
      setDoc(doc(db, currentUser.email, docId), newData)
        .then(() => {
          router.push(`resumes/${docId}`);
        });
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return (
    <button className={'copy-button'} type="submit" onClick={handleCopyCv}>Copy</button>
  );
}

export default CopyCvButton;