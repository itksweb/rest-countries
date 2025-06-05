import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CountryInfoCard = ({ country }) => {
  if (!country) return null;

  const { name, capital, flags, population, region } = country;
  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center px-4 py-6 max-sm:w-[90%] sm:w-[47%] md:w-[31%] lg:w-[23%]"
    >
      <Link to={`/countries/${name.common}`}>
        <div className="rounded-sm overflow-hidden shadow-lg transition-colors">
          <img
            src={flags?.png}
            alt={`${name.common} flag`}
            className="w-full h-48 object-cover"
          />

          <div className="element-bg text-[14px] font-light px-5 pt-5 pb-7">
            <h2 className="text-xl font-bold mb-4 ">{name.common}</h2>
            <p className=" ">
              <span className="font-semibold">Population:</span>{" "}
              {population.toLocaleString()}
            </p>
            <p className="">
              <span className="font-semibold">Region:</span> {region}
            </p>
            <p className="">
              <span className="font-semibold">Capital:</span>{" "}
              {capital.join(", ") || "N/A"}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CountryInfoCard;
