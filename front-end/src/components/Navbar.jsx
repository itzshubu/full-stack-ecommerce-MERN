import React, { useState } from "react";
import Darkbtn from "./darkbtn";
import Icons from "./uiverse/icons";
import Dropdown from "../components/uiverse/dropdown";
import { NavLink } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  let Navigate = useNavigate()
 let [input1 , setInput1]= useState('')

  return (
    <>
      <div className="sticky top-0 flex px-7 py-3  justify-between items-center mainColor">
        <div className="flex gap-2 font-bold text-2xl">
          <img
            className="w-[40px] h-auto"
            src="https://shopsy-tcj.netlify.app/assets/logo-Jm4BVSCI.png"
            alt=""
          />
          Shopz
        </div>
        <div className="flex items-center gap-3 text-lg">
          <div className="hidden sm:block">
          <Icons />
          </div>
          <Darkbtn />
        </div>
      </div>
      {/* input search for mobile */}
      <div className="bg-blue-200 dark:bg-black  w-full flex gap-2 justify-center sm:hidden  p-2">
        <div className="flex p-2 items-center gap-2 justify-center border bg-white dark:bg-black border-black dark:border-white rounded-full">
          <FaSearch onClick={()=>Navigate(`/search/${input1}`)} className="font-bold text-xl" />{" "}
          <input
            type="text"
            placeholder="Search" 
            value={input1}
            onChange={(e)=>setInput1(e.target.value)}
            onKeyDown={(e)=>e.key=="Enter"?Navigate(`/search/${input1}`):""}
            className="outline-none bg-inherit border-none w-[200px]"
          />
        </div>
      </div>
      <div className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200">
        <ul className="flex items-center gap-4 sm:gap-8 justify-center font-medium text-base p-2">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "Active menu-item" : "menu-item"
            }
          >
            <IoHomeOutline /> Home
          </NavLink>
          <NavLink
            to="Explore"
            className={({ isActive }) =>
              isActive ? "Active menu-item" : "menu-item"
            }
          >
            <MdOutlineExplore /> Explore
          </NavLink>
          <NavLink
            onClick={(e)=>e.preventDefault()}
            className={({ isActive }) =>
              isActive ? " menu-item group" : "menu-item group"
            }
          >
            <BiCategoryAlt /> Categories
            <ul className="dark:bg-black rounded-md text-black dark:text-white transition-all  duration-500 absolute  top-[20px]  w-[150%] opacity-0 invisible bg-slate-100 left-0 group-hover:visible group-hover:opacity-100 group-hover:top-[30px] ">
              <li className="flex p-2 hover:bg-gray-400">
                <NavLink
                  to="categories/all"
                  className={({ isActive }) =>
                    isActive
                      ? "Active menu-item "
                      : "menu-item "
                  }
                >
                  All
                </NavLink>
              </li>
              <li className="flex p-2 hover:bg-gray-400">
                <NavLink
                  to="categories/menscloths"
                  className={({ isActive }) =>
                    isActive
                      ? "Active menu-item "
                      : "menu-item "
                  }
                >
                  Men's Cloths
                </NavLink>
              </li>
              <li className="flex p-2 hover:bg-gray-400">
                <NavLink
                  to="categories/womenscloths"
                  className={({ isActive }) =>
                    isActive
                      ? "Active menu-item "
                      : "menu-item "
                  }
                >
                  Women's Cloths
                </NavLink>
              </li>
              <li className="flex p-2 hover:bg-gray-400">
                <NavLink
                  to="categories/electronics"
                  className={({ isActive }) =>
                    isActive
                      ? "Active menu-item "
                      : "menu-item "
                  }
                >
                  Electronics
                </NavLink>
              </li>
              <li className="flex p-2 hover:bg-gray-400">
                <NavLink
                  to="categories/jewelery"
                  className={({ isActive }) =>
                    isActive
                      ? "Active menu-item "
                      : "menu-item "
                  }
                >
                  Jewelery
                </NavLink>
              </li>
            </ul>
          </NavLink>
          <li className="group relative cursor-pointer">
            <div className="flex items-center gap-[2px] py-2 ">
              Grocery
              <span>
                <FaCaretDown className="transition-all duration-200  group-hover:rotate-180" />
              </span>
            </div>
            <div className="dark:bg-black rounded-md text-black dark:text-white absolute z-[9999] hidden  group-hover:block w-[150px] rounded-md bg-white p-2 text-black shadow-md ">
              <ul className="flex flex-col items-start">
                <NavLink
                  to="/grocery/wheat"
                  className={({ isActive }) =>
                    isActive
                      ? "Active menu-item"
                      : "menu-item "
                  }
                >
                  {" "}
                  <li className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                    {" "}
                    Wheat
                  </li>
                </NavLink>
                <NavLink
                  to="/grocery/rice"
                  className={({ isActive }) =>
                    isActive
                      ? "Active menu-item"
                      : "menu-item "
                  }
                >
                  <li className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                    {" "}
                    Rice
                  </li>
                </NavLink>
                <NavLink
                  to="/grocery/oil"
                  className={({ isActive }) =>
                    isActive
                      ? "Active menu-item"
                      : "menu-item "
                  }
                >
                  {" "}
                  <li className="inline-block w-full rounded-md p-2 hover:bg-primary/20">
                    {" "}
                    Oil
                  </li>
                </NavLink>
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
