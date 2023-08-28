import React, {useEffect, useState} from "react";
import {collection, getDocs, query} from "firebase/firestore";
import {db} from "../../../firebase";
import {useAuth} from "@/context/AuthContext";
import CvView from "@/component/CvView/CvView";
import { redirect } from 'next/navigation';

const ResumeList = () => {
  const [cvdata, setCvdata] = useState({});
  const {currentUser} = useAuth()

  if (!currentUser) {
    redirect('/')
  }

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, currentUser.email));
      const querySnapshot = await getDocs(q);
      let allCvs = {};

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        allCvs = {...allCvs, [doc.id]: doc.data()}
      });

      setCvdata(allCvs);

      /*const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const newData = docSnap.data()
        setCvdata(newData)
      } else {
        console.log("No such document!");
      }*/
    }

    fetchData()
      .catch(console.error);
  }, []);

  return (
    <div className="resume-list">
      {cvdata && Object.keys(cvdata).map(id => {
        console.log(cvdata[id])
        return <CvView cvdata={cvdata[id]} key={id} isMiniature={true} id={id} />
      })}
    </div>
  )
}

export default ResumeList;