import React from 'react';
import {useAuth} from "@/context/AuthContext";
import {doc, setDoc} from "firebase/firestore";
import {db} from "../../../../firebase";
import {useRouter} from "next/navigation";

const NewCvButton = () => {
  const {currentUser} = useAuth();
  const router = useRouter();
  const docId = (Math.random() + 1).toString(36).substring(2);
  const handleNew = async () => {
    await setDoc(doc(db, currentUser.email, docId), {})
      .then(() => {
        router.push(`resumes/${docId}`);
      });
  }

  return (
    <button onClick={handleNew}>New</button>
  );
}

export default NewCvButton;