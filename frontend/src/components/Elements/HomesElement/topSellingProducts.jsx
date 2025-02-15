import React from "react";
import { FaStar } from "react-icons/fa6";
import { NavLink } from "react-router-dom";

const ProductData = [
  {
    id: 2,
    img: "https://img.freepik.com/free-photo/smiling-young-handsome-guy-wearing-black-t-shirt-holding-bag-shoulder-isolated-orange-wall_141793-91491.jpg?ga=GA1.1.2066432878.1696925075&semt=ais_hybrid",
    title: "Men's Uppers",
    rating: "4.5",
    color: "Pink",
    aosDelay: "800",
    route: "/topselling/upper",
  },
  {
    id: 3,
    img: "https://shopsy-tcj.netlify.app/assets/women3-HFaPDX0l.jpg",
    title: "Goggles",
    rating: "4.7",
    color: "brown",
    aosDelay: "400",
    route: "/topselling/Goggles",
  },
  {
    id: 1,
    img: "https://shopsy-tcj.netlify.app/assets/women-NhG2D3pl.png",
    title: "Women Ethnic",
    rating: "5 ",
    color: "red ",
    aosDelay: "0",
    route: "/topselling/WomenEthnic",
  },
  {
    id: 4,
    img: "https://img.freepik.com/premium-photo/guy-holds-shows-empty-eco-bag-yellow-background-smiles-no-plastic_164411-2043.jpg?ga=GA1.1.2066432878.1696925075&semt=ais_hybrid",
    title: "Men's Bottom wear",
    rating: "4.4",
    color: "yellow ",
    aosDelay: "600",
    route: "/topselling/bottom",
  },
  {
    id: 5,
    img: "https://shopsy-tcj.netlify.app/assets/women2-wroTMLvf.jpg",
    title: "Women western",
    rating: "4.5",
    color: "white",
    aosDelay: "200",
    route: "/topselling/Womenwestern",
  },
];

const product = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container m-auto ">
        {/* header section  */}
        <div className="text-center  mb-10 max-w-[600px] mx-auto  ">
          <p className="text-lg textmainColor ">
            {" "}
            Top Selling Products for you
          </p>
          <h1 className="text-3xl font-bold my-3 ">Products</h1>
          <p className="text-xs text-gray-400">
            "Discover Our Top-Selling Products! Shop the most popular picks
            loved by our customers. Don’t miss out on these favorites – grab
            them before they’re gone!"
          </p>
        </div>

        {/* bidy section  */}
        <div>
          <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 place-items-center gap-5">
            {/* cards section */}
            {ProductData.map((item) => {
              return (
                <NavLink to={item.route}>
                  <div key={item.id} className="space-y-3 transition-all duration-300 hover:scale-110 hover:shadow-xl shadow-gray-400">
                    <img
                      src={item.img}
                      alt=""
                      className=" h-[340px] w-[250px] sm:h-[240px] sm:w-[170px] object-cover rounded-md "
                    ></img>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.color}</p>
                      <div className="flex items-center gap-1 ">
                        <FaStar className="text-yellow-400" />
                        <span>{item.rating}</span>
                      </div>
                    </div>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default product;
