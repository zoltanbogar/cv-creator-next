import React, {ChangeEvent} from 'react';
import {contact, hard, image, language, reference, school, soft, work} from "@/types/CvTypes";

function isSoft(myValue: string | ReadonlyArray<string> | number | { [p: string]: { [p: string]: any } } | contact | reference[] | hard[] | school[] | work[] | soft[] | image | undefined): myValue is soft[] {
  return true;
}

function isSofty(myValue: soft | undefined): myValue is soft {
  return true;
}

type SkillFieldProps = {
  keyword: string,
  idx: number,
  handleSkillInfoChange: (event: ChangeEvent<HTMLInputElement>) => void,
  value: string | ReadonlyArray<string> | number | { [p: string]: { [p: string]: any } } | contact | reference[] | hard[] | school[] | work[] | soft[] | image | undefined,
}

//@ts-ignore
function isValidValue(value, idx) {
  return isSoft(value) && typeof value !== 'undefined' && idx in value && isSofty(value[idx]);
}

const SkillField = ({keyword, handleSkillInfoChange, value, idx}: SkillFieldProps) => {
  let res = <></>;
  if (isValidValue(value, idx)) {
    //@ts-ignore
    res = <div className={`multi-item mt-4 multiitem-${keyword} ${value?.[idx]?.label ? "" : "hidden"}`} data-child-eq={idx} key={idx}>
      <input
        type="text"
        className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"}
        data-foo={"label"}
        onChange={handleSkillInfoChange}
        //@ts-ignore
        value={value?.[idx]?.label}
      />
    </div>
  }
  return (
    <>
      {res}
    </>
  );
}

export default SkillField;