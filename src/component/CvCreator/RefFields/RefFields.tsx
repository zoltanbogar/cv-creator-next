import React from 'react';

const RefFields = ({hidden, change, number, value}) => {
  return (
    <div className={`ref-wrapper ${hidden ? 'hidden' : ''}`} data-child-eq={number} key={number}>
      <div className="item-wrapper">
        <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Title</label>
        <input value={value?.[number]?.title} data-foo={"title"} onChange={change} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"/>
      </div>
      <div className="item-wrapper">
        <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Description</label>
        <textarea value={value?.[number]?.description} data-foo={"description"} onChange={change} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} rows="10"></textarea>
      </div>
    </div>
  );
}

export default RefFields;