import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoHome } from "react-icons/io5";
import { FaStar, FaFire, FaTag, FaBox } from "react-icons/fa6";
import { HiSquares2X2 } from "react-icons/hi2";
import Producttemp from "../producttemp";
import ProductGrid from "../ProductGrid";
import { amazon } from "../../config/images.js";

const categoryCards = [
  {
    title: "Men's Wear",
    desc: "Shirts, jeans & more",
    to: "/categories/menscloths",
    image: amazon.mensShirt,
  },
  {
    title: "Women's Wear",
    desc: "Dresses & ethnic",
    to: "/categories/womenscloths",
    image: amazon.womensDress,
  },
  {
    title: "Electronics",
    desc: "Gadgets & audio",
    to: "/categories/electronics",
    image: amazon.headphones,
  },
  {
    title: "Jewelery",
    desc: "Rings & bands",
    to: "/categories/jewelery",
    image: "https://m.media-amazon.com/images/I/51Sutvw+pzL._AC_UL480_FMwebp_QL65_.jpg",
  },
  {
    title: "Grocery",
    desc: "Daily essentials",
    to: "/grocery/all",
    image: "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400",
  },
  {
    title: "Fruits",
    desc: "Fresh & organic",
    to: "/fruits",
    image: "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=400",
  },
];

const filters = [
  { id: "all", label: "All", icon: HiSquares2X2 },
  { id: "featured", label: "Featured", icon: FaFire },
  { id: "trending", label: "Trending", icon: FaStar },
  { id: "deals", label: "Deals", icon: FaTag },
  { id: "new", label: "New", icon: FaBox },
];

const Explore = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const { products, status } = useSelector((data) => data.MyProducts);

  const filteredProducts = useMemo(() => {
    if (!products?.length) return [];

    const featured = products.filter((p) => p.featured === true);
    const hasFeatured = featured.length > 0;

    switch (activeFilter) {
      case "featured":
        return hasFeatured
          ? featured
          : products.filter((p) => p.rating >= 4.5).slice(0, 12);
      case "trending":
        return [...products]
          .filter((p) => p.rating >= 4)
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 12);
      case "deals":
        return products.filter((p) => p.price <= 25).slice(0, 12);
      case "new":
        return [...products]
          .sort((a, b) => b.productId - a.productId)
          .slice(0, 12);
      default:
        return products;
    }
  }, [products, activeFilter]);

  return (
    <div className="min-h-[70vh] bg-gray-50 dark:bg-gray-950 pb-12">
      {/* Breadcrumb */}
      <div className="flex gap-2 text-gray-500 dark:text-gray-400 p-4 items-center text-lg">
        <NavLink to="/" className="hover:text-blue-500 transition-colors">
          <IoHome />
        </NavLink>
        <span>{">"}</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium">
          Explore
        </span>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 mb-10">
        <div className="rounded-2xl mainColor text-white p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-48 h-48 bg-white/10 rounded-full" />
          <div className="absolute -left-6 -bottom-6 w-32 h-32 bg-white/10 rounded-full" />
          <div className="relative z-10 max-w-2xl">
            <p className="text-blue-100 text-sm font-medium uppercase tracking-wider mb-2">
              Discover more
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              Explore Our Collection
            </h1>
            <p className="text-blue-50 text-sm sm:text-base leading-relaxed">
              Browse trending picks, daily deals, and shop by category — fashion,
              electronics, grocery, fruits & vegetables.
            </p>
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="container mx-auto px-4 mb-12">
        <h2 className="text-2xl font-bold text-center mb-2 text-gray-900 dark:text-white">
          Shop by Category
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400 text-sm mb-6">
          Jump straight into what you need
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categoryCards.map((cat) => (
            <NavLink
              key={cat.to}
              to={cat.to}
              className="group rounded-xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="home-img-frame aspect-square w-full">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-3 text-center">
                <h3 className="font-semibold text-sm text-gray-900 dark:text-white">
                  {cat.title}
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {cat.desc}
                </p>
              </div>
            </NavLink>
          ))}
        </div>
      </section>

      {/* Product filters + grid */}
      <section className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          Products for You
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {filters.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveFilter(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === id
                  ? "mainColor text-white shadow-md"
                  : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-blue-400"
              }`}
            >
              <Icon className="text-sm" />
              {label}
            </button>
          ))}
        </div>

        {status === "loading" && (
          <p className="text-center text-gray-500 py-12">Loading products...</p>
        )}

        {status !== "loading" && filteredProducts.length === 0 && (
          <p className="text-center text-gray-500 py-12">
            No products found. Make sure the backend is running and products are
            loaded in MongoDB.
          </p>
        )}

        <ProductGrid>
          {filteredProducts.map((item) => (
            <Producttemp key={item.productId} item={item} />
          ))}
        </ProductGrid>
      </section>
    </div>
  );
};

export default Explore;
