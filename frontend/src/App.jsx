import { useState } from "react";
import { Outlet } from "react-router-dom";
import Headroom from "react-headroom";
import Icons from "./components/uiverse/icons"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [count, setCount] = useState(0);
  console.log(import.meta.env.VITE_API_URL)

  return (
    <>
      <div className="overflow-y-hidden max-w-screen-2xl m-auto duration-500 dark:bg-black bg-white text-black dark:text-white">
        <Headroom>
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
