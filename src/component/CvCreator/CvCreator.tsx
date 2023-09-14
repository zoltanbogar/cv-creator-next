import React, {useEffect, useState, useRef} from 'react'
import {doc, setDoc, getDoc} from "firebase/firestore";

import {db} from "../../../firebase"

import AccordionComponent from "@/component/CvCreator/Accordion/Accordion";

import './index.css';

import ReactToPrint, { useReactToPrint } from 'react-to-print';
import {useAuth} from "@/context/AuthContext";
import CvView from "@/component/CvView/CvView";
import {language, reference, TData} from "@/types/CvTypes";
import {DocumentData} from "@firebase/firestore-types";

type CvCreatorProps = {
  id: string;
}

// eslint-disable-next-line react/display-name
const CvCreator = React.forwardRef(({id}:CvCreatorProps) => {
  const [cvdata, setCvdata] = useState<TData | DocumentData | null>(null);
  const [shouldSave, setShouldSave] = useState(false);

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const {currentUser} = useAuth()
  //console.log(currentUser)

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, currentUser.email, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const newData: TData | DocumentData = docSnap.data()
        console.log(newData);
        setCvdata(newData)
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
      }
      //console.log({cvdata})
    }

    fetchData()
      .catch(console.error);
  }, []);

  //@ts-ignore
  const handleDataChange = (keyword, data) => {
    //console.log({cvdata, data})
    if (keyword === 'languages' || keyword === 'hard' || keyword === 'work' || keyword === 'school' || keyword === 'ref') {
      //@ts-ignore
      data = {...cvdata[keyword], ...data}
    }
    //@ts-ignore
    const newData = {...cvdata, [keyword]: data}
    //console.log({newData})page.tsx
    setCvdata(newData)
    //console.log({cvdata, data})
    setShouldSave(true)
  }


  const handleSave = async () => {
    await setDoc(doc(db, currentUser.email, id ? id : (Math.random() + 1).toString(36).substring(2)), cvdata);
    //await setDoc(doc(db, currentUser.email, (Math.random() + 1).toString(36).substring(2)), cvdata);
    setShouldSave(false)

    //mindig újat ment, pedig tárolni kellene az ID-t és overwrite

    //window.flash('Saved!', 'success')
  }

  return (
    <>
      <div className={"flex flex-row gap-10"}>
        <aside style={{backgroundColor: "black", minWidth: '30%', maxWidth: '30%'}}>
          {/*@ts-ignore*/}
          <AccordionComponent data={cvdata} setData={handleDataChange}/>
          <button
            className={`ml-4 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${!shouldSave ? "opacity-50 cursor-not-allowed" : ""}`}
            disabled={!shouldSave} type={"button"} onClick={handleSave}>Save
          </button>
          <button onClick={handlePrint} className="ml-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Save as PDF</button>
        </aside>
        {/*@ts-ignore*/}
        <CvView cvdata={cvdata} componentRef={componentRef} />
      </div>
    </>
  )
})
export default CvCreator;