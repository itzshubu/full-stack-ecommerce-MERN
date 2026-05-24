import React from "react";
import { FaStar } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { amazon } from "../../../config/images.js";

const ProductData = [
  {
    id: 2,
    img: "https://img.freepik.com/free-photo/smiling-young-handsome-guy-wearing-black-t-shirt-holding-bag-shoulder-isolated-orange-wall_141793-91491.jpg?ga=GA1.1.2066432878.1696925075&semt=ais_hybrid",
    title: "Men's Uppers",
    rating: "4.5",
    color: "Orange",
    route: "/categories/menscloths",
  },
  {
    id: 3,
    img: amazon.goggles,
    title: "Goggles",
    rating: "4.7",
    color: "Black",
    route: "/categories/electronics",
  },
  {
    id: 1,
    img: amazon.womensDress,
    title: "Women Ethnic",
    rating: "5",
    color: "Floral",
    route: "/categories/womenscloths",
  },
  {
    id: 4,
    img: "https://img.freepik.com/premium-photo/guy-holds-shows-empty-eco-bag-yellow-background-smiles-no-plastic_164411-2043.jpg?ga=GA1.1.2066432878.1696925075&semt=ais_hybrid",
    title: "Men's Bottom wear",
    rating: "4.4",
    color: "Yellow",
    route: "/categories/menscloths",
  },
  {
    id: 5,
    img: amazon.womensSkirt,
    title: "Women western",
    rating: "4.5",
    color: "Casual",
    route: "/categories/womenscloths",
  },
];

const TopSellingProducts = () => {
  return (
    <div className="mt-4 mb-6 sm:mt-14 sm:mb-12 bg-gray-50 dark:bg-gray-950 py-6 sm:py-10">
      <div className="container m-auto px-4">
        <div className="text-center mb-4 sm:mb-10 max-w-[600px] mx-auto">
          <p className="text-sm sm:text-lg textmainColor">Top Selling Products for you</p>
          <h1 className="text-2xl sm:text-3xl font-bold my-1 sm:my-3">Products</h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Discover our most popular picks loved by customers.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
          {ProductData.map((item) => (
            <NavLink key={item.id} to={item.route} className="group">
              <div className="rounded-xl bg-white dark:bg-gray-900 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-800">
                <div className="home-img-frame aspect-[4/5] w-full">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-3 text-center sm:text-left">
                  <h3 className="font-semibold text-sm sm:text-base line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {item.color}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-1 mt-1">
                    <FaStar className="text-yellow-400 text-sm" />
                    <span className="text-sm">{item.rating}</span>
                  </div>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopSellingProducts;
