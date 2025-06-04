import { useEffect, useState } from "react";
import CountryInfoCard from "./CountryInfoCard";
import data from "../data.json";



const Countries = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const [touched, setTouched] = useState(false);

  //set initial country data
  useEffect(() => setFilteredData(data), []);

  // set filtered or no filtered data
  useEffect(() => {
    const chosenData = () => {
      if (!selectedInput && !searchInput) {
        return setFilteredData([...data]);
      }
      if (searchInput.trim() && selectedInput) {
        return setFilteredData(
          data
            .filter((item) => item.region === selectedInput)
            .filter((item) =>
              item.name.toLowerCase().startsWith(searchInput.toLowerCase())
            )
        );
      }
      if (selectedInput) {
        setFilteredData(data.filter((item) => item.region === selectedInput));
      }
      if (searchInput) {
        return setFilteredData(
          data.filter((item) =>
            item.name.toLowerCase().startsWith(searchInput.toLowerCase())
          )
        );
      }
    };
    chosenData();
  }, [selectedInput, searchInput]);

  //populate country filter options
  useEffect(() => {
    if (data.length) {
      let regs = [];
      for (const country of data) {
        if (!regs.includes(country.region)) {
          regs = [...regs, country.region];
        }
      }
      setRegions([...regs]);
    }
  }, [data]);

  const handleInputChange = (e) => {
    const { value, id } = e.target;
    if (!touched) setTouched(true);
    id.endsWith("filter") ? setSelectedInput(value) : setSearchInput(value);
  };

  if (!filteredData.length && !touched) {
    return <h2 className="text-xl text-center">loading ...</h2>;
  }

  let display = (
    <div className="flex justify-center flex-wrap">
      {filteredData.map((country) => (
        <CountryInfoCard country={country} key={country.name} />
      ))}
    </div>
  );
  if (!filteredData.length && touched) {
    display = (
      <div className="flex justify-center items-center">
        <h3 className="text-2xl">No countries available here</h3>
      </div>
    );
  }
 

  return (
    <div>
      <div className="flex justify-between items-center w-full py-4 px-[5%] mb-7 ">
        <input
          type="search"
          name="country-search"
          id="country-search"
          className="element-bg w-[33%] p-4 rounded-sm shadow-lg"
          value={searchInput}
          onChange={handleInputChange}
        />
        <select
          name="country-filter"
          id="country-filter"
          className=" element-bg p-4 rounded-sm shadow-lg"
          onChange={handleInputChange}
          value={selectedInput}
        >
          <option value="">filter by region</option>
          {regions.map((region) => (
            <option value={region} key={region}>
              {region}
            </option>
          ))}
        </select>
      </div>
      {display}
    </div>
  );
};

export default Countries;
