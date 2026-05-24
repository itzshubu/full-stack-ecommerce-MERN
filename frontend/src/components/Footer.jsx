import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook, FaLinkedin, FaLocationArrow, FaMobileAlt } from "react-icons/fa";

const footerStyle = {
  backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.92)), url("/footerimg.png")`,
  backgroundPosition: "bottom",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const Footer = () => {
  return (
    <footer className="text-white mb-20 relative" style={footerStyle}>
      <div className="container m-auto">
        <div className="grid md:grid-cols-3 gap-8 pb-16 pt-8 px-4">
          {/* Company */}
          <div className="py-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left mb-3 flex items-center gap-3">
              <img src="/vite.svg" alt="ShopFlick logo" className="max-w-[50px] bg-white rounded-full p-1" />
              ShopFlick
            </h1>
            <p className="text-gray-200 text-sm leading-relaxed">
              Your one-stop shop for fashion, electronics, and jewelry. Quality products with fast delivery.
            </p>
          </div>

          {/* Sections */}
          <div className="py-4">
            <h2 className="text-xl font-bold mb-4">Sections</h2>
            <ul className="flex flex-col gap-3 text-gray-200">
              <li>
                <NavLink to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/explore" className="hover:text-blue-400 transition-colors">
                  Explore
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories/all" className="hover:text-blue-400 transition-colors">
                  Categories
                </NavLink>
              </li>
              <li>
                <NavLink to="/cart" className="hover:text-blue-400 transition-colors">
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Categories + contact */}
          <div className="py-4">
            <h2 className="text-xl font-bold mb-4">Shop by Category</h2>
            <ul className="flex flex-col gap-3 text-gray-200 mb-6">
              <li>
                <NavLink to="/categories/menscloths" className="hover:text-blue-400 transition-colors">
                  Men&apos;s Wear
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories/womenscloths" className="hover:text-blue-400 transition-colors">
                  Women&apos;s Wear
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories/electronics" className="hover:text-blue-400 transition-colors">
                  Electronics
                </NavLink>
              </li>
              <li>
                <NavLink to="/categories/jewelery" className="hover:text-blue-400 transition-colors">
                  Jewelery
                </NavLink>
              </li>
              <li>
                <NavLink to="/grocery/all" className="hover:text-blue-400 transition-colors">
                  Grocery
                </NavLink>
              </li>
              <li>
                <NavLink to="/fruits" className="hover:text-blue-400 transition-colors">
                  Fruits
                </NavLink>
              </li>
              <li>
                <NavLink to="/vegetables" className="hover:text-blue-400 transition-colors">
                  Vegetables
                </NavLink>
              </li>
            </ul>

            <div className="flex items-center gap-3 mb-4">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                <FaInstagram className="text-3xl hover:text-pink-400 transition-colors" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
                <FaFacebook className="text-3xl hover:text-blue-400 transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedin className="text-3xl hover:text-sky-400 transition-colors" />
              </a>
            </div>

            <div className="space-y-2 text-gray-200 text-sm">
              <div className="flex items-center gap-3">
                <FaLocationArrow />
                <p>Una, Himachal Pradesh</p>
              </div>
              <div className="flex items-center gap-3">
                <FaMobileAlt />
                <p>+91 8219644580</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
