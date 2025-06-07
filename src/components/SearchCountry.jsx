import { useSelector } from "react-redux";
const SearchCountry = ({handleInputChange, searchInput}) => {
    const { theme } = useSelector((state) => state.gen);
  return (
    <div className="flex items-center element-bg max-sm:w-[90%] sm:w-[47%] md:w-[31%] lg:w-[23%] p-4 rounded-sm shadow-lg">
      <svg
        className="size-4 shrink-0"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 20"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
        />
      </svg>
      <input
        onChange={handleInputChange}
        value={searchInput}
        type="search"
        id="country-search"
        className={`ps-10 text-sm outline-0 focus:ring-0 focus:border-0`}
        placeholder="Search for a country"
      />
    </div>
  );
}

export default SearchCountry
