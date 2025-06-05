import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CountryCard = ({ country }) => {
  if (!country) return null;

  const {
    name,
    capital,
    flags,
    currencies,
    languages,
    area,
    borders = [],
  } = country;

  const currencyNames = currencies
    ? Object.values(currencies)
        .map((c) => c.name)
        .join(", ")
    : "N/A";
  const languageNames = languages ? Object.values(languages).join(", ") : "N/A";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center px-4 py-6"
    >
      <div className="w-full max-w-md rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-800 transition-colors">
        <img
          src={flags?.png}
          alt={`${name.common} flag`}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-center text-blue-600 dark:text-blue-400">
            {name.common}
          </h2>
          <div className="text-gray-700 dark:text-gray-200 space-y-2">
            <p>
              <span className="font-semibold">Capital:</span>{" "}
              {capital?.[0] || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Currency:</span> {currencyNames}
            </p>
            <p>
              <span className="font-semibold">Language:</span> {languageNames}
            </p>
            <p>
              <span className="font-semibold">Land Mass:</span>{" "}
              {area.toLocaleString()} km²
            </p>
            <div>
              <span className="font-semibold">Bordering Countries:</span>
              {borders.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2 max-h-20 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-600">
                  {borders.map((border, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-2 py-1 rounded-full"
                    >
                      {border}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">None</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const CountryInfo = ({ countryName }) => {
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}?fullText=true`
        );
        const data = await res.json();
        console.log("REST", data)
        setCountryData(data[0]);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountry();
  }, [countryName]);

  return <CountryCard country={countryData} />;
};

export default CountryInfo;

// Example usage:
/*
<CountryInfo countryName="France" />
*/
