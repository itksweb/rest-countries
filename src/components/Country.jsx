import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import data from "../data.json";
import { motion } from "framer-motion";
import Back from "../assets/back.svg";
import { useSelector } from "react-redux";

const Country = () => {
  const { theme } = useSelector((state) => state.gen);
  const { countryId } = useParams();
  const navigate = useNavigate();
  const myData = data.filter((item) => item.name === countryId)[0];
  const {
    capital,
    flags,
    population,
    topLevelDomain,
    nativeName,
    region,
    subregion,
  } = myData;

 

  //retrieve the names of border countries and render them to the UI
  const borders = myData.hasOwnProperty("borders")
    ? data
        .filter((item) => myData.borders.includes(item.alpha3Code))
        .map((country) => country.name)
        .map((item) => (
          <Link to={`/countries/${item}`} key={item} className="mb-3">
            <span className="shadow-md px-3 py-1 rounded-sm element-bg">
              {item}
            </span>
          </Link>
        ))
    : "N/A";
  

  

  const currencies = myData.hasOwnProperty("currencies")
    ? myData.currencies.map((currency) => currency.code).join(", ")
    : "N/A";
  const languages = myData.hasOwnProperty("languages")
    ? myData.languages.map((language) => language.name).join(", ")
    : "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full py-4 px-[5%] max-sm:px-[10%]"
    >
      <button
        className="my-7 element-bg py-2 px-4 shadow-xl rounded-xs flex gap-2.5 cursor-pointer "
        type="button"
        onClick={() => navigate(-1)}
      >
        <img
          className={`w-5 ${theme === "dark" && "invert"}`}
          src={Back}
          alt="back-icon"
        />
        <span>Back</span>
      </button>
      <div className="flex max-md:flex-col items-center py-6 w-full max-md:gap-9">
        <img
          className=" h-auto w-2/5 max-md:w-full"
          src={flags?.png}
          alt={`${countryId} flag`}
        />
        <div id="countriy-details" className="md:w-1/2 md:ml-[10%]">
          <h1 className="text-3xl font-bold mb-4 ">{countryId}</h1>
          <div
            id="main"
            className="grid gap-10 max-sm:gap-8 max-xs:grid-cols-1 grid-cols-2 my-4  "
          >
            <div className="left">
              <p className=" ">
                <span className="font-semibold">Native Name:</span> {nativeName}
              </p>
              <p className=" ">
                <span className="font-semibold">Population:</span>{" "}
                {population.toLocaleString()}
              </p>
              <p className="">
                <span className="font-semibold">Region:</span> {region}
              </p>
              <p className="">
                <span className="font-semibold">Sub Region:</span> {subregion}
              </p>
              <p className="">
                <span className="font-semibold">Capital:</span>{" "}
                {capital || "N/A"}
              </p>
            </div>
            <div className="right">
              <div className="">
                <span className="font-semibold">Top Level Domain:</span>{" "}
                {topLevelDomain.join(", ")}
              </div>
              <div className="">
                <span className="font-semibold">Currencies:</span>{" "}
                {currencies}
              </div>
              <div className="">
                <span className="font-semibold">Languages:</span> {languages}
              </div>
            </div>
            <div
              id="bottom"
              className="flex  max-sm:flex-col min-xs:col-span-2 "
            >
              <span className="font-semibold mr-2 max-sm:mr-0 shrink-0 ">
                Border Countries:{" "}
              </span>
              <div
                className="flex  text-sm max-sm:mt-4 flex-wrap gap-2"
                id="border-countries"
              >
                {borders}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Country;
