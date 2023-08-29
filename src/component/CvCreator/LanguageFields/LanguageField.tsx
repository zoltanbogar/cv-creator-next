import React from 'react';
import {contact, hard, image, language, reference, school, soft, work} from "@/types/CvTypes";

function isLanguage(myValue: string | ReadonlyArray<string> | number | { [p: string]: { [p: string]: any } } | contact | reference[] | hard[] | school[] | work[] | soft[] | image | undefined): myValue is language[] {
  return true;
}

function isLang(myValue: language | undefined): myValue is language {
  return true;
}

type LanguageFieldProps = {
  keyword: string,
  idx: number,
  handleLanguageDataChange: () => void,
  value: string | ReadonlyArray<string> | number | { [p: string]: { [p: string]: any } } | contact | reference[] | hard[] | school[] | work[] | soft[] | image | undefined,
}

const LanguageField = ({keyword, handleLanguageDataChange, value, idx}) => {
  const res = (isLanguage(value) && idx in value && isLang(value[idx])) ?
    (
      <div className={`multibar-line mt-4 multibar-${keyword} ${value?.[idx]?.label ? "" : "hidden"}`} data-child-eq={idx} key={idx}>
        <input type="text" className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
               data-foo={"label"} onChange={handleLanguageDataChange} value={value?.[idx]?.label} />
        <input value={value?.[idx]?.value} type="range" onChange={handleLanguageDataChange} min={1} max={5} data-foo={"value"} className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"} />
      </div>
    ) :
    <></>
  return (
    {res}

  );
}

export default LanguageField;