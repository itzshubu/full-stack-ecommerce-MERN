import React from "react";
import { FaStar } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { amazon } from "../../../config/images.js";

const ProductDataa = [
  {
    id: 34,
    img: amazon.mensShirt,
    title: "Casual Wear",
    description:
      "Premium men's casual shirt crafted for comfort and style—perfect for any occasion.",
  },
  {
    id: 35,
    img: amazon.mensPolo,
    title: "Printed shirt",
    description:
      "Premium printed shirt with superior fabric and eye-catching designs.",
  },
  {
    id: 36,
    img: amazon.womensBlouse,
    title: "Women shirt",
    description:
      "High-quality women's shirt made for comfort and lasting style.",
  },
];

const TopProducts = () => {
  return (
    <div className="py-10 bg-white dark:bg-gray-900">
      <div className="container m-auto px-4">
        <div className="text-center max-w-[600px] m-auto mb-12">
          <p className="text-lg textmainColor">Top Rated Products for you</p>
          <h1 className="text-3xl font-bold my-3">Best Products</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Customer-favorite styles that combine quality and elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
          {ProductDataa.map((item) => (
            <NavLink key={item.id} to={`/product/${item.id}`}>
              <div className="rounded-2xl bg-gray-50 dark:bg-gray-800 hover:bg-blue-500 hover:text-white dark:hover:bg-blue-600 relative shadow-lg duration-300 group w-full max-w-[300px] overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="home-img-frame aspect-[4/5] w-full mt-4 mx-auto max-w-[220px]">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 text-center">
                  <div className="w-full flex items-center justify-center gap-1 mb-2">
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                    <FaStar className="text-yellow-500" />
                  </div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-gray-500 group-hover:text-white/90 duration-300 text-sm line-clamp-2 mt-2">
                    {item.description}
                  </p>
                  <button
                    type="button"
                    className="btn2 rounded-sm my-4 group-hover:bg-white group-hover:text-blue-600"
                  >
                    Order Now
                  </button>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
