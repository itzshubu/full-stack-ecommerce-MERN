import React from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { addToCartApi, selectIsCartPending } from "../Store/Slices/CartSlice";
import IconLoadingButton from "./ui/IconLoadingButton";;
import { Togglefav } from "../Store/Slices/FavSlice";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";

const producttemp = ({ item }) => {
  const dispatch = useDispatch();
  const pathname = window.location.pathname;

  const isfav =
    useSelector((data) => data.MyFav.favproducts).filter(
      (item2) => item2.productId == item.productId
    ).length > 0;

  const isAddingToCart = useSelector(
    selectIsCartPending(item.productId, "add")
  );

  function checkfav() {
    if (isfav) {
      toast.error("item removed from fav!");
    } else {
      toast.success("item added to fav!");
    }
  }

  const stars = [];
  const rating = (rat) => {
    for (let i = 0; i <= 4; i++) {
      stars[i] = i < rat ? 1 : 0;
    }
  };
  rating(item.rating);

  return (
    <div className="w-full min-w-0">
      <NavLink to={`/product/${item.productId}`} className="block w-full">
        <Toaster />
        <div className="w-full h-full hover:scale-[1.02] dark:text-black dark:bg-blue-100 bg-white flex flex-col items-center p-2.5 sm:p-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-md hover:shadow-xl transition-all duration-200">
          <div className="text-[10px] sm:text-xs flex justify-end w-full font-semibold text-gray-400">
            id:{item.productId}
          </div>

          <div className="relative w-full">
            <img
              src={item.image}
              alt={item.name || item.subcategory}
              className="object-contain h-28 min-[480px]:h-32 sm:h-36 w-full mix-blend-multiply"
            />
            <div
              role="button"
              tabIndex={0}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(Togglefav(item));
                checkfav();
              }}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              className="border border-black p-0.5 absolute right-0 top-1 bg-white/90 rounded"
            >
              {isfav ? (
                <FaHeart className="text-red-500 text-sm" />
              ) : (
                <FaRegHeart className="text-sm" />
              )}
            </div>
          </div>

          <div className="flex flex-col justify-start w-full mt-2 min-w-0">
            <h1 className="font-bold text-xs sm:text-sm truncate w-full">
              {item.subcategory}
            </h1>
            <div className="flex text-[10px] sm:text-xs justify-start items-center flex-wrap gap-0.5">
              {stars.map((s, i) =>
                s === 1 ? (
                  <FaStar key={i} className="text-yellow-500 text-[10px] sm:text-xs" />
                ) : (
                  <FaRegStar key={i} className="text-[10px] sm:text-xs" />
                )
              )}
              <span className="font-semibold">{item.rating}</span>
            </div>
          </div>

          <div className="flex justify-between items-end w-full mt-3 gap-1">
            <div className="min-w-0">
              <div className="text-[10px] sm:text-xs">
                <span className="line-through font-semibold">
                  ${(item.price + item.price * 0.1).toFixed(2)}
                </span>
                <span className="bg-blue-200 px-0.5 ml-0.5 rounded-sm text-[9px] sm:text-xs">
                  -10%
                </span>
              </div>
              <div className="font-bold text-sm sm:text-base">${item.price}</div>
            </div>

            <div className="flex gap-1 shrink-0">
              <IconLoadingButton
                loading={isAddingToCart}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  try {
                    await dispatch(
                      addToCartApi({ productId: item.productId, quantity: 1 })
                    ).unwrap();
                    toast.success("item added to cart!");
                  } catch {
                    toast.error("Failed to add to cart");
                  }
                }}
                className="text-lg sm:text-xl bg-blue-700 w-7 h-7 sm:w-8 sm:h-8 text-white rounded-md shadow-md"
              >
                <MdOutlineShoppingCart />
              </IconLoadingButton>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default producttemp;
