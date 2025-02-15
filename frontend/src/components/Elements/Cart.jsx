import React from 'react'
import { useSelector , useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { addToCart ,removeByOne ,deleteItem } from "../../Store/Slices/CartSlice"
// icons
import { IoHome } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";

const Cart = () => {
  let Dispatch = useDispatch()
   let {cartProducts} = useSelector((data)=>{
      console.log(data)
            return data.MyCart
   }) 

  return (
    <div>
      <div className="flex gap-2 text-gray-500 p-4 items-center text-xl">
        {" "}
        <NavLink to="/">
          <IoHome className="text-gray-500" />
        </NavLink>{" "}
        {">"} cart
      </div>
      <div className="flex flex-col lg:flex-row p-3">
        <div className="w-[100%] lg:w-2/3">
          {cartProducts.map((item, index) => {
            return (
              <CartItem
                value={item}
                Dispatch={Dispatch}
                index={index}
                key={item.id}
              />
            );
          })}
        </div>
        <div className="lg:w-[30%] p-3 text-slate-600 bg-slate-100 rounded-md h-[70vh] flex flex-col justify-between">
          <div>
            <h3 className="text-slate-400">Order Summary</h3>
            <hr className="my-4" />
            <h5 className="flex justify-between">
              <span className="text-bold font-bold text-slate-500">
                {Math.round()}$
              </span>
            </h5>
            <h5 className="flex justify-between">
              Discount{" "}
              <span className="text-bold font-bold text-slate-500">
                -{89}$
              </span>
            </h5>
            <h5 className="flex justify-between">
              Delivery Cost{" "}
              <span className="text-bold font-bold text-slate-500">
                +{2}$
              </span>
            </h5>
          </div>
          <div>
            <hr className="my-4" />
            <h3 className="text-slate-400 flex justify-between">
              Grand Total :
              <span className="text-slate-600">
                {Math.round()}$
              </span>
            </h3>
            <button className="block w-full my-3 py-3 border bg-blue-400 border-blue-400 hover:bg-inherit hover:border-black">
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export const CartItem = ({ value, Dispatch, index}) => {
  

  function add(item, index) {
   console.log("i am add function")
   Dispatch(addToCart(value))
  }

  function remove(item, index) {
    Dispatch(removeByOne(item.id))
  
  }
  function dlt(item, index) {
    Dispatch(deleteItem(item.id))
  }
  return (
    <div className="flex p-4 justify-between lg:pr-10 items-center">
      <div className="flex justify-between">
        <div className="border mr-4">
          <img
            src={value.image}
            alt=""
            className="aspect-square object-contain object-top mix-blend-multiply w-[96px] min-w-24 sm:w-[192px] sm:min-w-48 p-2"
          />
          <div className="text-center  p-3  flex justify-center items-center bg-slate-200">
            <MdDeleteOutline
              className="text-3xl cursor-pointer "
              onClick={() => dlt(value, index)}
            />
          </div>
        </div>
        <div className="text-start pt-3">
          <h4 className="text-[16px] text-gray-500">{value.title}</h4>
          <p className="flex text-xl items-center gap-4 py-3">
            Qty :
            <FaRegSquareMinus
              className={`${value.quentity == 1?"text-gray-400":""} cursor-pointer text-2xl`}
              onClick={() =>{ if(value.quentity > 1)remove(value, index)}}
            />
            {value.quentity}
            <FaRegPlusSquare
              className="cursor-pointer text-2xl"
              onClick={() => add(value, index)}
            />
          </p>
          <p className="text-sm  font-bold text-gray-500">
            Price : {value.price}$
          </p>
          <div className="block sm:hidden">
            <h4 className="font-bold text-xl pt-3 ">
              Sub Total: {Math.round(value.amount * value.price)}$
            </h4>
          </div>
        </div>
      </div>
      <div className="hidden sm:block">
        <h4 className="font-bold text-xl pt-3 ">
          Sub Total: {Math.round(value.amount * value.price)}$
        </h4>
      </div>
    </div>
  );
};

export default Cart