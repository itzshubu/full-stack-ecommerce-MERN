import { useState } from "react";
import { Outlet } from "react-router-dom";
import Headroom from "react-headroom";
import Icons from "./components/uiverse/icons"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="max-w-screen-2xl mx-auto w-full duration-500 dark:bg-gray-950 bg-gray-50 text-black dark:text-white">
        <Headroom style={{ zIndex: 200 }} className="!overflow-visible">
          <Navbar />
        </Headroom>
        <div className="sm:hidden cthLyc2 z-[100]">
          <Icons />
        </div>
        <Outlet />
        <Footer/>
      </div>
    </>
  );
}

export default App;
