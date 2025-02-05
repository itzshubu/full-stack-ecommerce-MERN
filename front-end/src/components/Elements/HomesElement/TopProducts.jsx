import React from "react";
import { FaStar } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const ProductDataa = [
  {
    id: 34,
    img: "https://shopsy-tcj.netlify.app/assets/shirt-cwf9SKdB.png",
    title: "Casual Wear",
    description:
      " Experience premium quality with this men's casual shirt, crafted for unmatched comfort and style—perfect for any occasion. ",
  },
  {
    id: 35,
    img: "https://shopsy-tcj.netlify.app/assets/shirt2-XQzG6elp.png",
    title: "Printed shirt",
    description:
      "Elevate your style with this premium printed shirt, featuring superior quality fabric and eye-catching designs for any occasion.",
  },
  {
    id: 36,
    img: "https://shopsy-tcj.netlify.app/assets/shirt3-HwQ10bVo.png",
    title: "Women shirt",
    description:
      "sophistication to your wardrobe with this women's shirt, made from high-quality fabric for comfort and lasting style.",
  },
];

const TopProducts = () => {
  return (
    <div>
      <div className="container m-auto">
        {/* Header section */}
        <div className="text-center max-w-[600px] m-auto  mb-24 ">
          <p className="text-lg textmainColor "> Top Rated Products for you</p>
          <h1 className="text-3xl font-bold my-3 ">Best Products</h1>
          <p className="text-xs text-gray-400">
            "Explore top-rated men's and women's fashion! From trendy apparel to
            timeless classics, discover customer-favorite styles that combine
            quality and elegance. Upgrade your wardrobe with the best in
            fashion, handpicked for you!"
          </p>
        </div>
        {/* Body section  */}
        <div className="grid mb-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-20 md:gap-5 place-items-center">
          {ProductDataa.map((item) => {
            return (
              <NavLink key={item.id} to={`/product/${item.id}`}>
                <div className=" rounded-2xl bg-white dark:bg-gray-800 hover:bg-black/80 dark:hover:mainColor hover:text-white relative shadow-xl duration-300 group max-w-[300px] ">
                  {/* img sec  */}
                  <div className="h-[100px]">
                    <img
                      src={item.img}
                      alt=""
                      className="max-w-[140px] block mx-auto transform -translate-y-20 group-hover:scale-105 duration-300 drop-shadow-md"
                    ></img>
                  </div>
                  {/* detail sec  */}
                  <div className="p-4 text-center ">
                    {/* star */}
                    <div className="w-full flex items-center justify-center gap-1">
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                      <FaStar className="text-yellow-500" />
                    </div>
                    <h1 className="text-xl font-bold ">{item.title}</h1>
                    <p className="text-gray-500 group-hover:text-white duration-300 text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <button className="btn2 rounded-sm my-3 group-hover:bg-gray-300 hover:text-black dark:hover:bg-white">
                      Order Now{" "}
                    </button>
                  </div>
                </div>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TopProducts;
