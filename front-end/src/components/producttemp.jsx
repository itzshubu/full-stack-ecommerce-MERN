import React from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { NavLink } from 'react-router-dom'
import { FaStar } from "react-icons/fa6";
import { FaRegStar } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";
import { useDispatch } from "react-redux";
import {addToCart} from  "../Store/Slices/CartSlice"
import {Togglefav} from  "../Store/Slices/FavSlice"
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';

const producttemp = ({item}) => {
  let Dispatch =  useDispatch()

  let isfav = useSelector((data)=>{
    return data.MyFav.favproducts
  }).filter((item2)=>{
    return item2.id == item.id
  }).length > 0 ? true : false

 console.log('producttemp....')
  // console.log(isfav)
  let pathname = window.location.pathname

  function checkfav(){
    if(isfav){
      toast.error("item removed from fav!")
    }else{
      toast.success("item added to fav!")
    }
  }

    let arr = [];
    let rating = (rat) => {
      for (let i = 0; i <= 4; i++) {
        if (i < rat) {
          arr[i] = 1;
        } else {
          arr[i] = 0;
        }
      }
    };

  return (
    <div>
      <NavLink to={`/product/${item.id}`}>
      <Toaster />
      <div className=" hover:transform hover:scale-105 dark:text-black dark:bg-blue-100 bg-white  flex flex-col justify-center items-center p-4 w-60 sm:w-56 border border-gray-300 rounded-lg  shadow-md hover:shadow-xl transition-all duration-200 ">
        <div className="text-xs flex justify-end w-56 sm:w-48 font-semibold text-gray-400">
          id:{item.id}
        </div>

        <div className="relative">
          <img
            src={item.image}
            alt=""
            className="object-contain h-44 w-40 sm:w-36 mix-blend-multiply"
          />
          <NavLink to={pathname}>
          <div onClick={()=>{Dispatch(Togglefav(item));checkfav()}} className="border border-black p-1 absolute -right-4 top-2">
            {isfav?<FaHeart className="text-red-500"/>:<FaRegHeart/>}
          </div>
          </NavLink>
        </div>
        <div className="flex flex-col justify-start  w-48 sm:w-44 mt-3">
          <div className="">
            {" "}
            <h1 className="font-bold">{item.subcategory}</h1>
          </div>

          <div className="flex text-sm justify-start items-center">
            {rating(item.rating)}
            {arr.map((item) => {
              if (item == 1) {
                return <FaStar />;
              } else {
                return <FaRegStar />;
              }
            })}

            <span className="px-1 font-semibold">{item.rating}</span>
          </div>
        </div>
        {/* div in div */}
        <div className="flex justify-between w-48 sm:w-44 mt-6">
          <div className="">
            <div className=" text-xs ">
              <span className="line-through font-semibold ">{`$ ${(
                item.price +
                item.price * (10 / 100)
              ).toFixed(2)}`}</span>
              <span className="no-underline text-xs bg-blue-200 px-1  ml-1 rounded-sm">
                -10%
              </span>
            </div>
            <div className="font-bold">{`$ ${item.price}`}</div>
          </div>

          <NavLink key={item.id} onClick={()=>{Dispatch(addToCart(item));toast.success('item added to cart!')}} to={pathname}>
            <div className="flex justify-center items-center text-2xl bg-blue-700 w-8 h-8 text-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 ">
              <MdOutlineShoppingCart />
            </div>
          </NavLink>
          <div
            onClick={() => deletewishlist(item.id)}
            className="flex justify-center items-center text-2xl bg-red-600 w-8 h-8 text-white rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 "
          >
            <MdOutlineDeleteSweep />
          </div>
        </div>
      </div>
            </NavLink>
    </div>
  );
};

export default producttemp;
