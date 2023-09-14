import React from 'react'
import AccordionItemComponent from './AccordionItem/AccordionItem';
import {Accordion} from "@chakra-ui/react";

import {image, language, hard, soft, reference, work, school, contact, TData} from "@/types/CvTypes";
import {DocumentData} from "@firebase/firestore-types";

type AccordionComponentProps = {
  data: TData | DocumentData | null,
  setData:  (value: (((prevState: {}) => {}) | {})) => void
}

const AccordionComponent = ({data, setData}:AccordionComponentProps) => {

  console.log({data})

  return (
    <Accordion className='w-full' allowMultiple>
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"1-input"} title={"Name"} value={data?.name} keyword={'name'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"1-input"} title={"Title"} value={data?.title} keyword={'title'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"image"} title={"Image"} value={data?.image} keyword={'image'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"textarea"} title={"Description"} value={data?.description} keyword={'description'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"contact"} title={"Contact Info"} value={data?.contact} keyword={'contact'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"multi-bar"} title={"Languages"} value={data?.languages} keyword={'languages'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"multi-bar"} title={"Hard Skills"} value={data?.hard} keyword={'hard'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"multi-item"} title={"Soft Skills"} value={data?.soft} keyword={'soft'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"work"} title={"Work History"} value={data?.work} keyword={'work'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"school"} title={"Education"} value={data?.school} keyword={'school'} setData={setData} />
      {/*@ts-ignore*/}
      <AccordionItemComponent type={"ref"} title={"References"} value={data?.ref} keyword={'ref'} setData={setData} />
    </Accordion>
  );
}

export default AccordionComponent;