import React, { useState, useEffect } from "react";
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

const NavDropdown = ({
  id,
  label,
  icon: Icon,
  isActive,
  openMenu,
  setOpenMenu,
  children,
}) => {
  const isOpen = openMenu === id;

  return (
    <li className="relative shrink-0" data-nav-dropdown>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu(isOpen ? null : id);
        }}
        className={`nav-link cursor-pointer w-full ${
          isActive ? "nav-link-active" : ""
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {Icon && <Icon />}
        {label}{" "}
        <FaCaretDown
          className={`text-xs inline transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <ul
        className={`absolute left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 top-full pt-1 z-[250] min-w-[180px] transition-all duration-200 ${
          isOpen
            ? "opacity-100 visible pointer-events-auto"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <li
          className="bg-white dark:bg-gray-900 rounded-md shadow-xl border border-gray-200 dark:border-gray-700 py-1"
          onClick={() => setOpenMenu(null)}
        >
          {children}
        </li>
      </ul>
    </li>
  );
};

const Navbar = () => {
  const location = useLocation();
  const [openMenu, setOpenMenu] = useState(null);
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

  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("[data-nav-dropdown]")) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!openMenu) return;

    const closeOnScroll = () => setOpenMenu(null);

    window.addEventListener("scroll", closeOnScroll, true);
    window.addEventListener("wheel", closeOnScroll, { passive: true, capture: true });

    return () => {
      window.removeEventListener("scroll", closeOnScroll, true);
      window.removeEventListener("wheel", closeOnScroll, true);
    };
  }, [openMenu]);

  return (
    <header className="sticky top-0 z-[200] overflow-visible isolate">
      <LogoutConfirmModal
        open={showLogoutModal}
        loading={isLoggingOut}
        onCancel={closeLogoutConfirm}
        onConfirm={confirmLogout}
      />
      <div className="flex px-3 sm:px-7 py-1.5 md:py-3 justify-between items-center gap-2 mainColor text-white">
        <NavLink to="/" className="flex gap-1.5 font-bold text-lg sm:text-2xl items-center text-white hover:opacity-90 shrink-0">
          <img className="w-8 h-8 sm:w-[40px] sm:h-auto bg-white rounded-full p-0.5 sm:p-1" src="/vite.svg" alt="Shopz logo" />
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
            className="hidden sm:block text-xl sm:text-[26px] cursor-pointer hover:scale-110 transition-transform"
            onClick={openLogoutConfirm}
            title="Logout"
          />
        </div>
      </div>

      <div className="bg-blue-100 dark:bg-gray-900 w-full flex justify-center md:hidden px-2 py-0.5 border-b border-blue-200 dark:border-gray-800">
        <SearchBar variant="compact" className="w-full max-w-lg shadow-sm" />
      </div>

      <nav className="shadow-md bg-white dark:bg-gray-900 dark:text-white duration-200 relative overflow-visible">
        <ul className="nav-menu-mobile flex items-center gap-2 sm:gap-6 md:gap-8 justify-center font-medium text-xs sm:text-sm md:text-base px-1 md:p-2 flex-nowrap py-0.5 md:py-2 overflow-visible">
          <li className="shrink-0">
            <NavLink to="/" end className={navClass} onClick={() => setOpenMenu(null)}>
              <IoHomeOutline /> Home
            </NavLink>
          </li>
          <li className="shrink-0">
            <NavLink to="/explore" className={navClass} onClick={() => setOpenMenu(null)}>
              <MdOutlineExplore /> Explore
            </NavLink>
          </li>

          <NavDropdown
            id="categories"
            label="Categories"
            icon={BiCategoryAlt}
            isActive={isCategoriesActive}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          >
            <NavLink to="/categories/all" className={dropdownClass}>All</NavLink>
            <NavLink to="/categories/menscloths" className={dropdownClass}>Men&apos;s Cloths</NavLink>
            <NavLink to="/categories/womenscloths" className={dropdownClass}>Women&apos;s Cloths</NavLink>
            <NavLink to="/categories/electronics" className={dropdownClass}>Electronics</NavLink>
            <NavLink to="/categories/jewelery" className={dropdownClass}>Jewelery</NavLink>
          </NavDropdown>

          <NavDropdown
            id="grocery"
            label="Grocery"
            isActive={isGroceryActive}
            openMenu={openMenu}
            setOpenMenu={setOpenMenu}
          >
            <NavLink to="/grocery/all" className={dropdownClass}>All Grocery</NavLink>
            <NavLink to="/grocery/wheat" className={dropdownClass}>Wheat & Grains</NavLink>
            <NavLink to="/grocery/rice" className={dropdownClass}>Rice</NavLink>
            <NavLink to="/grocery/oil" className={dropdownClass}>Cooking Oil</NavLink>
            <NavLink to="/fruits" className={dropdownClass}>Fruits</NavLink>
            <NavLink to="/vegetables" className={dropdownClass}>Vegetables</NavLink>
          </NavDropdown>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
