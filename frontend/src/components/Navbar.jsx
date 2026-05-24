import React from "react";
import Darkbtn from "./darkbtn";
import Icons from "./uiverse/icons";
import { NavLink, useLocation } from "react-router-dom";
import { FaCaretDown } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useLogoutConfirm } from "../hooks/useLogoutConfirm";
import SearchBar from "./SearchBar";

const navClass = ({ isActive }) =>
  isActive ? "nav-link nav-link-active" : "nav-link";

const dropdownClass = ({ isActive }) =>
  isActive ? "nav-dropdown-link nav-dropdown-link-active" : "nav-dropdown-link";

const Navbar = () => {
  const location = useLocation();
  const {
    showLogoutModal,
    isLoggingOut,
    openLogoutConfirm,
    closeLogoutConfirm,
    confirmLogout,
  } = useLogoutConfirm();

  const isCategoriesActive = location.pathname.startsWith("/categories");
  const isGroceryActive =
    location.pathname.startsWith("/grocery") ||
    location.pathname === "/fruits" ||
    location.pathname === "/vegetables";

  return (
    <header className="sticky top-0 z-[200] overflow-visible isolate max-md:mb-4">
      <LogoutConfirmModal
        open={showLogoutModal}
        loading={isLoggingOut}
        onCancel={closeLogoutConfirm}
        onConfirm={confirmLogout}
      />
      <div className="flex px-4 sm:px-7 py-3 justify-between items-center gap-3 mainColor text-white">
        <NavLink to="/" className="flex gap-2 font-bold text-xl sm:text-2xl items-center text-white hover:opacity-90 shrink-0">
          <img className="w-[40px] h-auto bg-white rounded-full p-1" src="/vite.svg" alt="Shopz logo" />
          Shopz
        </NavLink>
        <div className="hidden md:flex flex-1 max-w-lg mx-2">
          <SearchBar className="w-full shadow-sm" />
        </div>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-[15px] text-lg shrink-0">
          <div className="hidden sm:block">
            <Icons />
          </div>
          <Darkbtn />
          <IoMdLogOut
            className="text-2xl sm:text-[26px] cursor-pointer hover:scale-110 transition-transform"
            onClick={openLogoutConfirm}
            title="Logout"
          />
        </div>
      </div>

      {/* Mobile / tablet search */}
      <div className="bg-blue-100 dark:bg-gray-900 w-full flex justify-center md:hidden px-3 py-2 border-b border-blue-200 dark:border-gray-800">
        <SearchBar className="w-full max-w-lg shadow-sm" />
      </div>

      <nav className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative overflow-visible max-md:pb-3">
        <ul className="flex items-center gap-4 sm:gap-8 justify-center font-medium text-base px-2 pt-2 pb-3 sm:pb-2 flex-wrap overflow-visible">
          <li>
            <NavLink to="/" end className={navClass}>
              <IoHomeOutline /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/explore" className={navClass}>
              <MdOutlineExplore /> Explore
            </NavLink>
          </li>
          {/* Categories dropdown */}
          <li className="relative group">
            <span
              className={`nav-link cursor-pointer ${
                isCategoriesActive ? "nav-link-active" : ""
              }`}
            >
              <BiCategoryAlt /> Categories <FaCaretDown className="text-xs inline" />
            </span>
            <ul className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-[250] min-w-[180px] pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
              <li className="bg-white dark:bg-gray-900 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 py-1 pointer-events-auto">
                <NavLink to="/categories/all" className={dropdownClass}>All</NavLink>
                <NavLink to="/categories/menscloths" className={dropdownClass}>Men&apos;s Cloths</NavLink>
                <NavLink to="/categories/womenscloths" className={dropdownClass}>Women&apos;s Cloths</NavLink>
                <NavLink to="/categories/electronics" className={dropdownClass}>Electronics</NavLink>
                <NavLink to="/categories/jewelery" className={dropdownClass}>Jewelery</NavLink>
              </li>
            </ul>
          </li>

          {/* Grocery dropdown */}
          <li className="relative group">
            <span
              className={`nav-link cursor-pointer ${
                isGroceryActive ? "nav-link-active" : ""
              }`}
            >
              Grocery <FaCaretDown className="text-xs inline" />
            </span>
            <ul className="absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible group-focus-within:opacity-100 group-focus-within:visible transition-all duration-200 z-[250] min-w-[200px] pointer-events-none group-hover:pointer-events-auto group-focus-within:pointer-events-auto">
              <li className="bg-white dark:bg-gray-900 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 py-1 pointer-events-auto">
                <NavLink to="/grocery/all" className={dropdownClass}>All Grocery</NavLink>
                <NavLink to="/grocery/wheat" className={dropdownClass}>Wheat & Grains</NavLink>
                <NavLink to="/grocery/rice" className={dropdownClass}>Rice</NavLink>
                <NavLink to="/grocery/oil" className={dropdownClass}>Cooking Oil</NavLink>
                <NavLink to="/fruits" className={dropdownClass}>Fruits</NavLink>
                <NavLink to="/vegetables" className={dropdownClass}>Vegetables</NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
