import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from 'react'
import {Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel} from "@chakra-ui/react";
import WorkFields from "@/component/CvCreator/WorkFields/WorkFields";
import SchoolFields from "@/component/CvCreator/SchoolFields/SchoolFields";
import RefFields from "@/component/CvCreator/RefFields/RefFields";

import {getDownloadURL, ref, uploadBytes} from "firebase/storage";

import {storage} from "../../../../../firebase";

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import {contact, hard, image, reference, school, soft, work} from "@/types/CvTypes";
import LanguageField from "@/component/CvCreator/LanguageFields/LanguageField";
import SkillField from "@/component/CvCreator/SkillFields/SkillField";
import {max} from "@popperjs/core/lib/utils/math";

type AccordionItemComponentProps = {
  type: string,
  title: string,
  keyword: string,
  //@ts-ignore
  setData:  any,//(value: ((prevState: {}) => {}) | {}, p: { url: string }) => void,
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
        const idxArray = Array.from({length: 10}, (_, i) => i + 1);
        return (
          <div className={"multibar-wrapper"}>
            {idxArray.map(idx => <LanguageField idx={idx} key={idx} handleLanguageDataChange={handleLanguageDataChange} value={value} keyword={keyword}/>)}

            {/*<button onClick={event => addNewMultibarLine(event)}>+</button>*/}
          </div>
        );
      case 'multi-item':
        const idxArr = Array.from({length: 11}, (_, i) => i + 1);
        return (
          <div className={"multiitem-wrapper"}>
            {idxArr.map(idx => <SkillField idx={idx} key={idx} handleSkillInfoChange={handleSkillInfoChange} value={value} keyword={keyword}/>)}

            {/*<button onClick={event => addNewMultiItemLine(event)}>+</button>*/}
          </div>
        );
      case 'work':
        return (
          <Accordion className='w-full' allowMultiple>
            <WorkFields change={handleWorkDataChange} number={1} value={value} />
            <WorkFields change={handleWorkDataChange} number={2} value={value} />
            <WorkFields change={handleWorkDataChange} number={3} value={value} />
            <WorkFields change={handleWorkDataChange} number={4} value={value} />
            <WorkFields change={handleWorkDataChange} number={5} value={value} />
            <WorkFields change={handleWorkDataChange} number={6} value={value} />
            <WorkFields change={handleWorkDataChange} number={7} value={value} />
            <WorkFields change={handleWorkDataChange} number={8} value={value} />
            <WorkFields change={handleWorkDataChange} number={9} value={value} />
            <WorkFields change={handleWorkDataChange} number={10} value={value} />
            <WorkFields change={handleWorkDataChange} number={11} value={value} />
            <button onClick={addNewWorkItem}>+</button>
          </Accordion>
        );
      case 'school':
        console.log(value);
        return (
          <>
            <SchoolFields change={handleWorkDataChange} number={1} value={value} />
            <SchoolFields change={handleWorkDataChange} number={2} value={value} />
            <SchoolFields change={handleWorkDataChange} number={3} value={value} />
            <SchoolFields change={handleWorkDataChange} number={4} value={value} />
            <SchoolFields change={handleWorkDataChange} number={5} value={value} />
            <SchoolFields change={handleWorkDataChange} number={6} value={value} />
            <SchoolFields change={handleWorkDataChange} number={7} value={value} />
            <SchoolFields change={handleWorkDataChange} number={8} value={value} />
            <SchoolFields change={handleWorkDataChange} number={9} value={value} />
            <SchoolFields change={handleWorkDataChange} number={10} value={value} />
            <SchoolFields change={handleWorkDataChange} number={11} value={value} />
            <button onClick={addNewSchoolItem}>+</button>
          </>
        );
      case 'ref':
        return (
          <>
            <RefFields change={handleWorkDataChange} number={1} value={value} />
            <RefFields change={handleWorkDataChange} number={2} value={value} />
            <RefFields change={handleWorkDataChange} number={3} value={value} />
            <RefFields change={handleWorkDataChange} number={4} value={value} />
            <RefFields change={handleWorkDataChange} number={5} value={value} />
            <RefFields change={handleWorkDataChange} number={6} value={value} />
            <RefFields change={handleWorkDataChange} number={7} value={value} />
            <RefFields change={handleWorkDataChange} number={8} value={value} />
            <RefFields change={handleWorkDataChange} number={9} value={value} />
            <RefFields change={handleWorkDataChange} number={10} value={value} />
            <RefFields change={handleWorkDataChange} number={11} value={value} />
            <button onClick={addNewRefItem}>+</button>
          </>
        );
      default:
        return <></>;
    }
  }

  const handleWorkDataChange = (event: ChangeEvent) => {
    const foo = event.target.getAttribute("data-foo");

    const eventTarget: EventTarget & Element = event.target;

    if (event && event.target && event.target.parentNode && event.target.parentNode?.parentNode) {
      const parent = event.target.parentNode.parentNode as HTMLElement;
      const order = parent.getAttribute('data-child-eq')
      //console.log({value})
      //const newValue = {...value, [order]: {[foo]: event.target.value}}
      if (typeof value === 'undefined') {
        value = {1: {}}
      }
      //@ts-ignore
      let fooke = {...value[order], [foo]: eventTarget.value}
      //@ts-ignore
      if (foo == 'current') {
        //@ts-ignore
        fooke = {...value[order], [foo]: event.target.checked}
      }
      //@ts-ignore
      value = {[order]: fooke}
      //@ts-ignore
      setData(keyword, value)
    }
  }

  const addNewWorkItem = () => {
    const multibarLines = document.querySelectorAll(`.work-wrapper.hidden`)
    const firstHiddenLine = multibarLines[0]
    //console.log(multibarLines, firstHiddenLine);
    firstHiddenLine.classList.remove('hidden')
    if (firstHiddenLine.getAttribute('data-child-eq') === "11") {
      //@ts-ignore
      event.target.classList.add('hidden')
    }
  }

  const addNewSchoolItem = () => {
    const multibarLines = document.querySelectorAll(`.school-wrapper.hidden`)
    const firstHiddenLine = multibarLines[0]
    //console.log(multibarLines, firstHiddenLine);
    firstHiddenLine.classList.remove('hidden')
    if (firstHiddenLine.getAttribute('data-child-eq') === "11") {
      //@ts-ignore
      event.target.classList.add('hidden')
    }
  }

  const addNewRefItem = () => {
    const multibarLines = document.querySelectorAll(`.ref-wrapper.hidden`)
    const firstHiddenLine = multibarLines[0]
    //console.log(multibarLines, firstHiddenLine);
    firstHiddenLine.classList.remove('hidden')
    if (firstHiddenLine.getAttribute('data-child-eq') === "11") {
      //@ts-ignore
      event.target.classList.add('hidden')
    }
  }

  const handleSkillInfoChange = (event: ChangeEvent) => {
    const foo = event.target.getAttribute("data-foo");
    const parent = event.target.parentNode;
    //@ts-ignore
    const order = parent.getAttribute('data-child-eq')
    //@ts-ignore
    value = {...value, [order]: {[foo]: event.target.value}}
    //console.log(foo, order, newValue)
    //@ts-ignore
    setData(keyword, value)
  }

  const handleContactInfoDataChange = (event: ChangeEvent) => {
    //console.log(event.target.getAttribute("data-foo"))
    const foo = event.target.getAttribute("data-foo");
//@ts-ignore
    const newValue = {...value, [foo]: event.target.value}
    //console.log(newValue)
    //@ts-ignore
    //setData(keyword, {["url"]: url})
    value = newValue
    setData(keyword, newValue)
  }

  const handleLanguageDataChange = (event:ChangeEvent) => {
    //console.log(event.target.getAttribute("data-foo"))
    const foo = event.target.getAttribute("data-foo");

    const parent = event.target.parentNode;
    //@ts-ignore
    const order = parent.getAttribute('data-child-eq')
    //console.log({value})
    //const newValue = {...value, [order]: {[foo]: event.target.value}}
    if (typeof value === 'undefined') {
      value = {1: {}}
    }
    //@ts-ignore
    const fooke = {...value[order], [foo]: event.target.value}
    const newValue = {[order]: fooke}

    //console.log({fooke})

    //const newValue = {...value, [foo]: event.target.value}
    console.log({newValue, keyword})
    value = newValue
    //@ts-ignore
    setData(keyword, newValue)
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

  /*const addNewMultibarLine = (event: React.MouseEvent<HTMLButtonElement>) => {
    const keys = Object.keys(value);
    //@ts-ignore
    const maxKey = Math.max(...keys);

    setData(keyword, {[maxKey+1]: {["label"]: "", ["value"]: '1'}});
  }*/

  const addNewMultiItemLine = (event: React.MouseEvent<HTMLButtonElement>) => {
    //setLanguageLines([...languageLines, createNewMultibarLine(languageLineCount + 1)])
    //setLanguageLineCount(languageLineCount + 1)

    /*const multibarLines = document.querySelectorAll(`.multi-item.hidden.multiitem-${keyword}`)
    const firstHiddenLine = multibarLines[0]
    //console.log(multibarLines, firstHiddenLine);
    firstHiddenLine.classList.remove('hidden')
    if (firstHiddenLine.getAttribute('data-child-eq') === "11") {
      //@ts-ignore
      event.target.classList.add('hidden')
    }*/
  }

  const handleInputChange = (event: ChangeEvent) => {
    const foo = event.target.getAttribute("data-foo");

    const parent = event.target.parentNode;
    //@ts-ignore
    const targetValue = event.target.value;
    //console.log(targetValue)
    console.log(foo, parent, targetValue);
    //@ts-ignore
    setData(keyword, targetValue)
    value = targetValue
  }

  return (
    <AccordionItem className="border-b border-gray-200 py-[17px] dark:!border-white/10 p-4">
      <h2>
        <AccordionButton className="flex justify-between">
      <span
        className="text-left font-bold text-navy-900 dark:text-white"
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