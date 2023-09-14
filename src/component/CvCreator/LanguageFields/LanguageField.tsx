import React, {ChangeEvent} from 'react';
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
  handleLanguageDataChange: (event: ChangeEvent<HTMLInputElement>) => void,
  value: string | ReadonlyArray<string> | number | { [p: string]: { [p: string]: any } } | contact | reference[] | hard[] | school[] | work[] | soft[] | image | undefined,
}

//@ts-ignore
function isValidValue(value, idx) {
  return isLanguage(value) && typeof value !== 'undefined' && idx in value && isLang(value[idx]);
}

const LanguageField = ({keyword, handleLanguageDataChange, value, idx}: LanguageFieldProps) => {
  let res = <></>;
  if (isValidValue(value, idx)) {
    //@ts-ignore
    res = <div className={`multibar-line mt-4 multibar-${keyword} ${value?.[idx]?.label ? "" : "hidden"}`}
           data-child-eq={idx} key={idx}>
        <input type="text"
               className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
               data-foo={"label"}
               onChange={handleLanguageDataChange}
              //@ts-ignore
               value={value?.[idx]?.label}
        />
        {/*@ts-ignore*/}
        <input value={value?.[idx]?.value}
               type="range"
               onChange={handleLanguageDataChange}
               min={1}
               max={5}
               data-foo={"value"}
               className={"w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"}
        />
      </div>
  }
  return (
    <>
      {res}
    </>
  );
}

export default LanguageField;