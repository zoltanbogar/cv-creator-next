import React, {ChangeEvent, useEffect, useState} from 'react'
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import WorkFields from "@/component/CvCreator/WorkFields/WorkFields";
import SchoolFields from "@/component/CvCreator/SchoolFields/SchoolFields";
import RefFields from "@/component/CvCreator/RefFields/RefFields";

import allowCors from "../../../../Utils/Cors";

import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {storage} from "../../../../../firebase";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { image, language, hard, soft, reference, work, school, contact } from "@/types/CvTypes";
import LanguageField from "@/component/CvCreator/LanguageFields/LanguageField";

type AccordionItemComponentProps = {
  type: string,
  title: string,
  keyword: string,
  setData:  (value: ((prevState: {}) => {}) | {}, p: { url: string }) => void,
  value: string | ReadonlyArray<string> | number | undefined | {[p: string]: {[p: string]: any}} | contact | reference[] | hard[] | school[] | work[] | soft[] | image,
}

function isContact(myValue: string | ReadonlyArray<string> | number | { [p: string]: { [p: string]: any } } | contact | reference[] | hard[] | school[] | work[] | soft[] | image | undefined): myValue is contact {
  return true;
}

const AccordionItemComponent = ({type, title, value, keyword, setData}: AccordionItemComponentProps) => {
  const [languageLines, setLanguageLines] = useState([]);
  const [languageLineCount, setLanguageLineCount] = useState(0)
  const [avatarUrl, setNewAvatarUrl] = useState('');
  const [cropper, setCropper] = useState<any>();

  //const storage = getStorage();
  //const storageRef = ref(storage, 'some-child');

  const getNewAvatarUrl = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewAvatarUrl(URL.createObjectURL(e.target.files[0]));
    }
  };

  const getCropData = async () => {
    if (cropper) {
      const file = await fetch(cropper.getCroppedCanvas().toDataURL())
        .then((res) => res.blob())
        .then((blob) => {
          return new File([blob], "newAvatar.png", { type: "image/png" });
        });
      if (file) {
        //console.log(file)
        await handleFile(file)
      }
    }
  };

  const handleFile = async (file: Blob | Uint8Array | ArrayBuffer) => {
    const storageRef = ref(storage);
    const fileRef = ref(storageRef, `images/bla`)
    uploadBytes(fileRef, file).then((res) => {
      //window.flash('Successful upload!', 'success')

      getDownloadURL(fileRef).then((url: string) => {
        setData('image', {['url']: url})
      })
        .catch((error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/object-not-found':
              // File doesn't exist
              break;
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect the server response
              break;
          }
        });
    })
  }

  const renderSwitch = (type: string) => {
    switch (type) {
      case '1-input':
        return <input
          className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
          type={"text"}
          value={typeof value === 'string' || typeof value === 'number' ? value : ''}
          onChange={handleInputChange}
        />;
      case 'image':
        return (
          <>
            <input
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={getNewAvatarUrl}
            />
            <Cropper
              src={avatarUrl}
              style={{ height: 400, width: 300 }}
              initialAspectRatio={3 / 4}
              minCropBoxHeight={100}
              minCropBoxWidth={100}
              guides={false}
              checkOrientation={false}
              onInitialized={(instance) => {
                setCropper(instance);
              }}
            />
            <button onClick={getCropData}>Crop Image</button>
          </>
        )
      case 'textarea':
        return <textarea
          onChange={handleInputChange}
          value={typeof value === 'string' || typeof value === 'number' ? value : ''}
          rows={10}
          className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}></textarea>
      case 'contact':
        const currentValue: string | ReadonlyArray<string> | number | { [p: string]: { [p: string]: any } } | contact | reference[] | hard[] | school[] | work[] | soft[] | image | undefined = value;




        return (
          <div>
            <div className={"mt-4"}>
              <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Address</label>
              <input className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     type="text"
                     data-foo={"address"}
                     value={isContact(currentValue) ? currentValue?.address : ''}
                     onChange={handleContactInfoDataChange}/>
            </div>
            <div className={"mt-4"}>
              <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>E-mail</label>
              <input className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     type="text"
              data-foo={"email"}
                     value={isContact(currentValue) ? currentValue?.email : ''}
              onChange={handleContactInfoDataChange}/>
            </div>
            <div className={"mt-4"}>
              <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>LinkedIn</label>
              <input className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     type="text"
                     data-foo={"linkedin"}
                     value={isContact(currentValue) ? currentValue?.linkedin : ''}
                     onChange={handleContactInfoDataChange}/>
            </div>
            <div className={"mt-4"}>
              <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Phone</label>
              <input className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     type="text"
                     data-foo={"phone"}
                     value={isContact(currentValue) ? currentValue?.phone : ''}
                     onChange={handleContactInfoDataChange}/>
            </div>
            <div className={"mt-4"}>
              <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>GitHub</label>
              <input className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     type="text"
                     data-foo={"github"}
                     value={isContact(currentValue) ? currentValue?.github : ''}
                     onChange={handleContactInfoDataChange}/>
            </div>
          </div>
        )
      case 'multi-bar':
        const idxArray = Array.from({length: 5}, (_, i) => i + 1);
        return (
          <div className={"multibar-wrapper"}>
            {idxArray.map(idx => <LanguageField idx={idx} key={idx} handleLanguageDataChange={handleLanguageDataChange} value={value} />)}

            <div className={`multibar-line mt-4 multibar-${keyword} ${value?.[6]?.label ? "" : "hidden"}`} data-child-eq={6} key={6}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleLanguageDataChange} value={value?.[6]?.label} />
              <input defaultValue={3} type="range" onChange={handleLanguageDataChange} min={1} max={5} data-foo={"value"} className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"} />
            </div>
            <div className={`multibar-line mt-4 multibar-${keyword} ${value?.[7]?.label ? "" : "hidden"}`} data-child-eq={7} key={7}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleLanguageDataChange} value={value?.[7]?.label} />
              <input defaultValue={3} type="range" onChange={handleLanguageDataChange} min={1} max={5} data-foo={"value"} className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"} />
            </div>
            <div className={`multibar-line mt-4 multibar-${keyword} ${value?.[8]?.label ? "" : "hidden"}`} data-child-eq={8} key={8}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleLanguageDataChange} value={value?.[8]?.label} />
              <input defaultValue={3} type="range" onChange={handleLanguageDataChange} min={1} max={5} data-foo={"value"} className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"} />
            </div>
            <div className={`multibar-line mt-4 multibar-${keyword} ${value?.[9]?.label ? "" : "hidden"}`} data-child-eq={9} key={9}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleLanguageDataChange} value={value?.[9]?.label} />
              <input defaultValue={3} type="range" onChange={handleLanguageDataChange} min={1} max={5} data-foo={"value"} className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"} />
            </div>
            <div className={`multibar-line mt-4 multibar-${keyword} ${value?.[10]?.label ? "" : "hidden"}`} data-child-eq={10} key={10}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleLanguageDataChange} value={value?.[10]?.label} />
              <input defaultValue={3} type="range" onChange={handleLanguageDataChange} min={1} max={5} data-foo={"value"} className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"} />
            </div>
            <div className={`multibar-line mt-4 multibar-${keyword} ${value?.[11]?.label ? "" : "hidden"}`} data-child-eq={11} key={11}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleLanguageDataChange} value={value?.[11]?.label} />
              <input defaultValue={3} type="range" onChange={handleLanguageDataChange} min={1} max={5} data-foo={"value"} className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"} />
            </div>

            <button onClick={addNewMultibarLine}>+</button>
          </div>
        );
      case 'multi-item':
        return (
          <div className={"multiitem-wrapper"}>
            <div className={`multi-item mt-4 multiitem-${keyword}`} data-child-eq={1} key={1}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[1]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[2]?.label ? "" : "hidden"}`} data-child-eq={2} key={2}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[2]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[3]?.label ? "" : "hidden"}`} data-child-eq={3} key={3}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[3]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[4]?.label ? "" : "hidden"}`} data-child-eq={4} key={4}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[4]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[5]?.label ? "" : "hidden"}`} data-child-eq={5} key={5}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[5]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[6]?.label ? "" : "hidden"}`} data-child-eq={6} key={6}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[6]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[7]?.label ? "" : "hidden"}`} data-child-eq={7} key={7}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[7]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[8]?.label ? "" : "hidden"}`} data-child-eq={8} key={8}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[8]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[9]?.label ? "" : "hidden"}`} data-child-eq={9} key={9}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[9]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[10]?.label ? "" : "hidden"}`} data-child-eq={10} key={10}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[10]?.label} />
            </div>
            <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[11]?.label ? "" : "hidden"}`} data-child-eq={11} key={11}>
              <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
                     data-foo={"label"} onChange={handleSkillInfoChange} value={value?.[11]?.label} />
            </div>

            <button onClick={addNewMultiItemLine}>+</button>
          </div>
        );
      case 'work':
        return (
          <Accordion className='w-full' allowMultiple>
            <WorkFields change={handleWorkDataChange} number={1} value={value} />
            <WorkFields change={handleWorkDataChange} number={2} value={value} hidden={!value?.[2]?.title} />
            <WorkFields change={handleWorkDataChange} number={3} value={value} hidden={!value?.[3]?.title} />
            <WorkFields change={handleWorkDataChange} number={4} value={value} hidden={!value?.[4]?.title} />
            <WorkFields change={handleWorkDataChange} number={5} value={value} hidden={!value?.[5]?.title} />
            <WorkFields change={handleWorkDataChange} number={6} value={value} hidden={!value?.[6]?.title} />
            <WorkFields change={handleWorkDataChange} number={7} value={value} hidden={!value?.[7]?.title} />
            <WorkFields change={handleWorkDataChange} number={8} value={value} hidden={!value?.[8]?.title} />
            <WorkFields change={handleWorkDataChange} number={9} value={value} hidden={!value?.[9]?.title} />
            <WorkFields change={handleWorkDataChange} number={10} value={value} hidden={!value?.[10]?.title} />
            <WorkFields change={handleWorkDataChange} number={11} value={value} hidden={!value?.[11]?.title} />
            <button onClick={addNewWorkItem}>+</button>
          </Accordion>
        );
      case 'school':
        return (
          <>
            <SchoolFields change={handleWorkDataChange} number={1} value={value} />
            <SchoolFields change={handleWorkDataChange} number={2} value={value} hidden={!value?.[2]?.title} />
            <SchoolFields change={handleWorkDataChange} number={3} value={value} hidden={!value?.[3]?.title} />
            <SchoolFields change={handleWorkDataChange} number={4} value={value} hidden={!value?.[4]?.title} />
            <SchoolFields change={handleWorkDataChange} number={5} value={value} hidden={!value?.[5]?.title} />
            <SchoolFields change={handleWorkDataChange} number={6} value={value} hidden={!value?.[6]?.title} />
            <SchoolFields change={handleWorkDataChange} number={7} value={value} hidden={!value?.[7]?.title} />
            <SchoolFields change={handleWorkDataChange} number={8} value={value} hidden={!value?.[8]?.title} />
            <SchoolFields change={handleWorkDataChange} number={9} value={value} hidden={!value?.[9]?.title} />
            <SchoolFields change={handleWorkDataChange} number={10} value={value} hidden={!value?.[10]?.title} />
            <SchoolFields change={handleWorkDataChange} number={11} value={value} hidden={!value?.[11]?.title} />
            <button onClick={addNewSchoolItem}>+</button>
          </>
        );
      case 'ref':
        return (
          <>
            <RefFields change={handleWorkDataChange} number={1} value={value} />
            <RefFields change={handleWorkDataChange} number={2} value={value} hidden={!value?.[2]?.title} />
            <RefFields change={handleWorkDataChange} number={3} value={value} hidden={!value?.[3]?.title} />
            <RefFields change={handleWorkDataChange} number={4} value={value} hidden={!value?.[4]?.title} />
            <RefFields change={handleWorkDataChange} number={5} value={value} hidden={!value?.[5]?.title} />
            <RefFields change={handleWorkDataChange} number={6} value={value} hidden={!value?.[6]?.title} />
            <RefFields change={handleWorkDataChange} number={7} value={value} hidden={!value?.[7]?.title} />
            <RefFields change={handleWorkDataChange} number={8} value={value} hidden={!value?.[8]?.title} />
            <RefFields change={handleWorkDataChange} number={9} value={value} hidden={!value?.[9]?.title} />
            <RefFields change={handleWorkDataChange} number={10} value={value} hidden={!value?.[10]?.title} />
            <RefFields change={handleWorkDataChange} number={11} value={value} hidden={!value?.[11]?.title} />
            <button onClick={addNewRefItem}>+</button>
          </>
        );
      default:
        return <></>;
    }
  }

  const handleWorkDataChange = (event) => {
    const foo = event.target.getAttribute("data-foo");

    const parent = event.target.parentNode.parentNode;
    const order = parent.getAttribute('data-child-eq')
    //console.log({value})
    //const newValue = {...value, [order]: {[foo]: event.target.value}}
    if (typeof value === 'undefined') {
      value = {1: {}}
    }
    let fooke = {...value[order], [foo]: event.target.value}
    if (foo == 'current') {
      fooke = {...value[order], [foo]: event.target.checked}
    }
    const newValue = {[order]: fooke}

    //console.log({fooke})

    //const newValue = {...value, [foo]: event.target.value}
    console.log({newValue, keyword})

    value = newValue
    setData(keyword, {["url"]: url})
  }

  const addNewWorkItem = () => {
    const multibarLines = document.querySelectorAll(`.work-wrapper.hidden`)
    const firstHiddenLine = multibarLines[0]
    //console.log(multibarLines, firstHiddenLine);
    firstHiddenLine.classList.remove('hidden')
    if (firstHiddenLine.getAttribute('data-child-eq') === "11") {
      event.target.classList.add('hidden')
    }
  }

  const addNewSchoolItem = () => {
    const multibarLines = document.querySelectorAll(`.school-wrapper.hidden`)
    const firstHiddenLine = multibarLines[0]
    //console.log(multibarLines, firstHiddenLine);
    firstHiddenLine.classList.remove('hidden')
    if (firstHiddenLine.getAttribute('data-child-eq') === "11") {
      event.target.classList.add('hidden')
    }
  }

  const addNewRefItem = () => {
    const multibarLines = document.querySelectorAll(`.ref-wrapper.hidden`)
    const firstHiddenLine = multibarLines[0]
    //console.log(multibarLines, firstHiddenLine);
    firstHiddenLine.classList.remove('hidden')
    if (firstHiddenLine.getAttribute('data-child-eq') === "11") {
      event.target.classList.add('hidden')
    }
  }

  const handleSkillInfoChange = (event) => {
    const foo = event.target.getAttribute("data-foo");
    const parent = event.target.parentNode;
    const order = parent.getAttribute('data-child-eq')
    const newValue = {...value, [order]: {[foo]: event.target.value}}
    value = newValue
    //console.log(foo, order, newValue)
    setData(keyword, {["url"]: url})
  }

  const handleContactInfoDataChange = (event) => {
    //console.log(event.target.getAttribute("data-foo"))
    const foo = event.target.getAttribute("data-foo");

    const newValue = {...value, [foo]: event.target.value}
    //console.log(newValue)
    setData(keyword, {["url"]: url})
    value = newValue
  }

  const handleLanguageDataChange = (event) => {
    //console.log(event.target.getAttribute("data-foo"))
    const foo = event.target.getAttribute("data-foo");

    const parent = event.target.parentNode;
    const order = parent.getAttribute('data-child-eq')
    //console.log({value})
    //const newValue = {...value, [order]: {[foo]: event.target.value}}
    if (typeof value === 'undefined') {
      value = {1: {}}
    }
    const fooke = {...value[order], [foo]: event.target.value}
    const newValue = {[order]: fooke}

    //console.log({fooke})

    //const newValue = {...value, [foo]: event.target.value}
    //console.log({newValue, keyword})
    value = newValue
    setData(keyword, {["url"]: url})
  }

  /*const createNewMultibarLine = (eq) => {
    return (
      <div className={"multibar-line mt-4"} data-child-eq={eq} key={eq}>
        <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
               data-foo={"label"} onChange={handleLanguageDataChange} value={value?.[eq]?.label} />
        <input defaultValue={3} type="range" onChange={handleLanguageDataChange} min={1} max={5} data-foo={"value"} className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"} />
      </div>
    );
  }*/

  const addNewMultibarLine = (event) => {
    //setLanguageLines([...languageLines, createNewMultibarLine(languageLineCount + 1)])
    //setLanguageLineCount(languageLineCount + 1)

    const multibarLines = document.querySelectorAll(`.multibar-line.hidden.multibar-${keyword}`)
    const firstHiddenLine = multibarLines[0]
    //console.log(multibarLines, firstHiddenLine);
    firstHiddenLine.classList.remove('hidden')
    if (firstHiddenLine.getAttribute('data-child-eq') === "11") {
      event.target.classList.add('hidden')
    }
  }

  const addNewMultiItemLine = (event) => {
    //setLanguageLines([...languageLines, createNewMultibarLine(languageLineCount + 1)])
    //setLanguageLineCount(languageLineCount + 1)

    const multibarLines = document.querySelectorAll(`.multi-item.hidden.multiitem-${keyword}`)
    const firstHiddenLine = multibarLines[0]
    //console.log(multibarLines, firstHiddenLine);
    firstHiddenLine.classList.remove('hidden')
    if (firstHiddenLine.getAttribute('data-child-eq') === "11") {
      event.target.classList.add('hidden')
    }
  }

  useEffect(() => {
    //if (type === 'multi-bar' && languageLines.length === 0) {
      //setLanguageLines([...languageLines, createNewMultibarLine(languageLineCount)])
    //}
  }, [])

  const handleInputChange = (event) => {
    const targetValue = event.target.value;
    //console.log(targetValue)
    setData(keyword, {["url"]: url})
    value = targetValue
  }

  return (
    <AccordionItem className="border-b border-gray-200 py-[17px] dark:!border-white/10 p-4">
      <h2>
        <AccordionButton className="flex justify-between">
      <span
        className="text-left font-bold text-navy-900 dark:text-white"
        flex="1"
        textAlign="left"
      >
        {title}
      </span>
          <AccordionIcon className="text-left !text-navy-900 dark:!text-white"/>
        </AccordionButton>
      </h2>
      <AccordionPanel
        className="text-medium mt-2 text-left !text-navy-900 dark:!text-white"
        pb={4}
      >
        {renderSwitch(type)}
      </AccordionPanel>
    </AccordionItem>
  )
}

export default AccordionItemComponent;