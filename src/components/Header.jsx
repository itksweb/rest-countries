import { useSelector } from "react-redux";
import ThemeToggle from "../assets/icon-moon.svg"


const Header = ({ themeToggle }) => {
    const { theme } = useSelector((state) => state.gen);
  return (
    <header
      className={`element-bg flex justify-between items-center w-full py-4 px-[5%] mb-7 shadow-lg `}
    >
      <h1 className="text-2xl font-semibold ">Where in the world?</h1>
      <div
        className="flex items-center justify-end cursor-pointer"
        onClick={() => themeToggle()}
      >
        <button>
          <img
            src={ThemeToggle}
            alt="theme-toggle"
            className={`${theme === "dark" && "invert"}`}
          />
        </button>
        <span className="ml-2">
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </span>
      </div>
    </header>
  );
};

export default Header;
