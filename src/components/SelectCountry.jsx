import React from 'react'

const SelectCountry = ({handleInputChange, selectedInput, regions}) => {
  return (
    <div className=" relative custom-select element-bg  rounded-sm shadow-lg max-sm:w-[90%] sm:w-[47%] md:w-[31%] lg:w-[23%]">
      <label htmlFor="country-filter" class="sr-only">
        Select a country
      </label>
      <select
        id="country-filter"
        name="country-filter"
        onChange={handleInputChange}
        value={selectedInput}
        className=" focus:ring-0 appearance-none element-bg outline-0 p-4 w-full "
      >
        <option value="">filter by region</option>
        {regions.map((region) => (
          <option value={region} key={region}>
            {region}
          </option>
        ))}
      </select>
      <div className=" absolute right-0 top-0 bottom-0 inputi flex items-center px-2">
        <svg
          className="size-4 "
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
          />
        </svg>
      </div>
    </div>
  );
}

export default SelectCountry
