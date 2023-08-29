import React from 'react'
import AccordionItemComponent from './AccordionItem/AccordionItem';
import {Accordion} from "@chakra-ui/react";

type AccordionComponentProps = {
  data: object,
  setData:  (value: (((prevState: {}) => {}) | {})) => void
}

const AccordionComponent = ({data, setData}) => {

  return (
    <Accordion className='w-full' allowMultiple>
      <AccordionItemComponent type={"1-input"} title={"Name"} value={data.name} keyword={'name'} setData={setData} />
      <AccordionItemComponent type={"1-input"} title={"Title"} value={data.title} keyword={'title'} setData={setData} />
      <AccordionItemComponent type={"image"} title={"Image"} value={data.image} keyword={'image'} setData={setData} />
      <AccordionItemComponent type={"textarea"} title={"Description"} value={data.description} keyword={'description'} setData={setData} />
      <AccordionItemComponent type={"contact"} title={"Contact Info"} value={data.contact} keyword={'contact'} setData={setData} />
      <AccordionItemComponent type={"multi-bar"} title={"Languages"} value={data.languages} keyword={'languages'} setData={setData} />
      <AccordionItemComponent type={"multi-bar"} title={"Hard Skills"} value={data.hard} keyword={'hard'} setData={setData} />
      <AccordionItemComponent type={"multi-item"} title={"Soft Skills"} value={data.soft} keyword={'soft'} setData={setData} />
      <AccordionItemComponent type={"work"} title={"Work History"} value={data.work} keyword={'work'} setData={setData} />
      <AccordionItemComponent type={"school"} title={"Education"} value={data.school} keyword={'school'} setData={setData} />
      <AccordionItemComponent type={"ref"} title={"References"} value={data.ref} keyword={'ref'} setData={setData} />
    </Accordion>
  );
}

export default AccordionComponent;