import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Countries from "./components/Countries";
import Country from "./components/Country";
import { setTheme } from "./store/generalSlice";
import Header from "./components/Header";

function App() {
  const {pathname} = useLocation();
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.gen);

  const retrieveUserPref = () => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      return "dark";
    }
  };
  useEffect(() => {
    const info = retrieveUserPref();
    if (info && info !== theme) {
      dispatch(setTheme(info));
    }
  }, []);

  const themeToggle =()=>{
    const newvalue = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newvalue)
    dispatch(setTheme(newvalue));
  }


  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [pathname]); // triggered on route change

  return (
    <div data-theme={theme} className="bg-text-color min-h-[100vh]">
      <Header themeToggle={themeToggle} />
      <Routes>
        <Route index element={<Countries />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/countries/:countryId" element={<Country />} />
        <Route path="*" element={<h1>Not Found Here</h1>} />
      </Routes>
    </div>
  );
}

export default App;
