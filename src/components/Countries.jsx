import { useEffect, useState } from "react";
import CountryInfoCard from "./CountryInfoCard";
import SearchCountry from "./SearchCountry";
import SelectCountry from "./SelectCountry";
// import data from "../data.json";

const Countries = ({ data }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [regions, setRegions] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const [touched, setTouched] = useState(false);

  //set initial country data
  useEffect(() => setFilteredData(data), [data]);

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
              item.name.common
                .toLowerCase()
                .startsWith(searchInput.toLowerCase())
            )
        );
      }
      if (selectedInput) {
        setFilteredData(data.filter((item) => item.region === selectedInput));
      }
      if (searchInput) {
        return setFilteredData(
          data.filter((item) =>
            item.name.common.toLowerCase().startsWith(searchInput.toLowerCase())
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
 const flx = "flex justify-center flex-wrap"
 const grd =
   "grid max-sm:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  let display = (
    <div className={grd}>
      {filteredData.map((country) => (
        <CountryInfoCard country={country} key={country.name.common} />
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
      <div className="flex justify-between max-sm:flex-col max-sm:justify-center items-center w-full py-4 px-[5%] mb-7 gap-4 ">
        <SearchCountry
          searchInput={searchInput}
          handleInputChange={handleInputChange}
        />
        <SelectCountry
          regions={regions}
          handleInputChange={handleInputChange}
          selectedInput={selectedInput}
        />
      </div>

      {display}
    </div>
  );
};

export default Countries;
