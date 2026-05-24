import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import LogoutConfirmModal from "./LogoutConfirmModal";
import { useLogoutConfirm } from "../hooks/useLogoutConfirm";
import { IoHome } from "react-icons/io5";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiOutlineHeart,
} from "react-icons/hi";
import { MdOutlineLogout, MdOutlineShoppingCart } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";

const Profilepage = () => {
  const {
    showLogoutModal,
    isLoggingOut,
    openLogoutConfirm,
    closeLogoutConfirm,
    confirmLogout,
  } = useLogoutConfirm();
  const { user } = useSelector((data) => data.MyAuth);
  const cartProducts = useSelector((data) => data.MyCart.cartProducts);
  const favProducts = useSelector((data) => data.MyFav.favproducts);

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="auth-card text-center max-w-md">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Please log in to view your profile.
          </p>
          <NavLink to="/login" className="btn1 inline-block">
            Go to Login
          </NavLink>
        </div>
      </div>
    );
  }

  const initials = user.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const cartCount = cartProducts.reduce(
    (sum, item) => sum + (item.quentity || 1),
    0
  );
  const savedCartCount = user.cart?.length || 0;
  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  const quickLinks = [
    { to: "/", label: "Continue Shopping", icon: IoHome },
    { to: "/cart", label: "My Cart", icon: MdOutlineShoppingCart },
    { to: "/categories/all", label: "Browse Categories", icon: BiCategoryAlt },
    { to: "/grocery/all", label: "Grocery Store", icon: HiOutlineShoppingBag },
  ];

  return (
    <div className="min-h-[70vh] bg-gray-50 dark:bg-gray-950 pb-16">
      <LogoutConfirmModal
        open={showLogoutModal}
        loading={isLoggingOut}
        onCancel={closeLogoutConfirm}
        onConfirm={confirmLogout}
      />
      {/* Breadcrumb */}
      <div className="flex gap-2 text-gray-500 dark:text-gray-400 p-4 items-center text-lg">
        <NavLink to="/" className="hover:text-blue-500 transition-colors">
          <IoHome />
        </NavLink>
        <span>{">"}</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          Profile
        </span>
      </div>

      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile header card */}
        <div className="auth-card overflow-hidden p-0 mb-6">
          <div className="mainColor h-28 sm:h-32 relative" />
          <div className="px-6 pb-6 -mt-14 sm:-mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white dark:border-gray-900 mainColor flex items-center justify-center text-3xl font-bold text-white shadow-lg mx-auto sm:mx-0">
                {initials || "U"}
              </div>
              <div className="text-center sm:text-left flex-1 pt-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {user.fullName}
                </h1>
                <p className="textmainColor font-medium capitalize mt-1">
                  {user.role || "user"} account
                </p>
              </div>
              <button
                type="button"
                onClick={openLogoutConfirm}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-red-300 text-red-600 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 transition-colors text-sm font-medium"
              >
                <MdOutlineLogout className="text-xl" />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="auth-card text-center py-4">
            <MdOutlineShoppingCart className="text-2xl textmainColor mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {cartCount}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              In cart now
            </p>
          </div>
          <div className="auth-card text-center py-4">
            <HiOutlineHeart className="text-2xl textmainColor mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {favProducts.length}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Favourites
            </p>
          </div>
          <div className="auth-card text-center py-4">
            <HiOutlineShoppingBag className="text-2xl textmainColor mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {savedCartCount}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Saved items
            </p>
          </div>
          <div className="auth-card text-center py-4">
            <FaRegCalendarAlt className="text-2xl textmainColor mx-auto mb-2" />
            <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
              {memberSince}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Member since
            </p>
          </div>
        </div>

        {/* Account details */}
        <div className="auth-card mb-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Account Details
          </h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <HiOutlineUser className="text-xl textmainColor mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Full name
                </p>
                <p className="font-medium text-gray-900 dark:text-white">
                  {user.fullName}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50">
              <HiOutlineMail className="text-xl textmainColor mt-0.5 shrink-0" />
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                  Email address
                </p>
                <p className="font-medium text-gray-900 dark:text-white break-all">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick actions */}
        <div className="auth-card">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {quickLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className="flex items-center gap-3 p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-all duration-200 group"
              >
                <span className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40 textmainColor group-hover:mainColor group-hover:text-white transition-colors">
                  <Icon className="text-xl" />
                </span>
                <span className="font-medium text-gray-800 dark:text-gray-200">
                  {label}
                </span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profilepage;
