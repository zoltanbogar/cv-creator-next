import React from 'react';

const SchoolFields = ({hidden, change, number, value}) => {
  const year = (new Date()).getFullYear();
  const years = Array.from(new Array(30),( val, index) => year - index);

  return (
    <div className={`school-wrapper ${hidden ? 'hidden' : ''}`} data-child-eq={number} key={number}>
      <div className="item-wrapper">
        <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>From</label>
        <select data-foo={"from-year"} onChange={change} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Pick a year</option>
          {
            years.map((year, index) => {
              return <option selected={value?.[number]?.['from-year'] == year} key={`year${index}`} value={year}>{year}</option>
            })
          }
        </select>
        <select data-foo={"from-month"} onChange={change} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option selected>Pick a month</option>
          <option selected={value?.[number]?.['from-month'] == 1} value="1">January</option>
          <option selected={value?.[number]?.['from-month'] == 2} value="2">February</option>
          <option selected={value?.[number]?.['from-month'] == 3} value="3">March</option>
          <option selected={value?.[number]?.['from-month'] == 4} value="4">April</option>
          <option selected={value?.[number]?.['from-month'] == 5} value="5">May</option>
          <option selected={value?.[number]?.['from-month'] == 6} value="6">June</option>
          <option selected={value?.[number]?.['from-month'] == 7} value="7">July</option>
          <option selected={value?.[number]?.['from-month'] == 8} value="8">August</option>
          <option selected={value?.[number]?.['from-month'] == 9} value="9">September</option>
          <option selected={value?.[number]?.['from-month'] == 10} value="10">October</option>
          <option selected={value?.[number]?.['from-month'] == 11} value="11">November</option>
          <option selected={value?.[number]?.['from-month'] == 12} value="12">December</option>
        </select>
      </div>
      <div className="item-wrapper">
        <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>To</label>
        <select data-foo={"to-year"} onChange={change} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${value?.[number]?.['current'] ? "hidden" : ""}`}>
          <option {...!value?.[number]?.['to-year'] ? 'selected' : ''}>Pick a year</option>
          {
            years.map((year, index) => {
              return <option selected={value?.[number]?.['to-year'] == year} key={`year${index}`} value={year}>{year}</option>
            })
          }
        </select>
        <select data-foo={"to-month"} onChange={change} className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${value?.[number]?.['current'] ? "hidden" : ""}`}>
          <option selected>Pick a month</option>
          <option selected={value?.[number]?.['to-month'] == 1} value="1">January</option>
          <option selected={value?.[number]?.['to-month'] == 2} value="2">February</option>
          <option selected={value?.[number]?.['to-month'] == 3} value="3">March</option>
          <option selected={value?.[number]?.['to-month'] == 4} value="4">April</option>
          <option selected={value?.[number]?.['to-month'] == 5} value="5">May</option>
          <option selected={value?.[number]?.['to-month'] == 6} value="6">June</option>
          <option selected={value?.[number]?.['to-month'] == 7} value="7">July</option>
          <option selected={value?.[number]?.['to-month'] == 8} value="8">August</option>
          <option selected={value?.[number]?.['to-month'] == 9} value="9">September</option>
          <option selected={value?.[number]?.['to-month'] == 10} value="10">October</option>
          <option selected={value?.[number]?.['to-month'] == 11} value="11">November</option>
          <option selected={value?.[number]?.['to-month'] == 12} value="12">December</option>
        </select>
        <input type="checkbox" onChange={change} checked={value?.[number]?.['current']} onClick={(event) => {
          //console.log(event.target.checked)
          const parent = event.target.parentNode;
          if (event.target.checked) {
            parent.querySelector('[data-foo="to-month"]').classList.add('hidden')
            parent.querySelector('[data-foo="to-year"]').classList.add('hidden')
          } else {
            parent.querySelector('[data-foo="to-month"]').classList.remove('hidden')
            parent.querySelector('[data-foo="to-year"]').classList.remove('hidden')
          }
        }} data-foo={'current'} />
        <label htmlFor="current">I currently study here</label>
        
      </div>
      <div className="item-wrapper">
        <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>Title</label>
        <input value={value?.[number]?.title} data-foo={"title"} onChange={change} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"/>
      </div>
      <div className="item-wrapper">
        <label htmlFor="" className={"block mb-2 text-sm font-medium text-gray-900 dark:text-white"}>School</label>
        <input value={value?.[number]?.school} data-foo={"school"} onChange={change} className={"bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"} type="text"/>
      </div>
    </div>
  );
}

export default SchoolFields;