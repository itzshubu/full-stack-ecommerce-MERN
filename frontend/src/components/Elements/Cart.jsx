import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import {
  updateCartQuantity,
  removeFromCartApi,
  addToCartApi,
  selectIsCartPending,
} from "../../Store/Slices/CartSlice"
import IconLoadingButton from "../ui/IconLoadingButton"
import ButtonSpinner from "../ui/ButtonSpinner"
import { IoHome } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegPlusSquare } from "react-icons/fa";
import { FaRegSquareMinus } from "react-icons/fa6";
import toast from 'react-hot-toast';

const Cart = () => {
  const dispatch = useDispatch()
  const { cartProducts } = useSelector((data) => data.MyCart)

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.price * (item.quentity || 1),
    0
  )
  const discount = Math.round(subtotal * 0.1)
  const delivery = cartProducts.length > 0 ? 2 : 0
  const grandTotal = subtotal - discount + delivery

  return (
    <div className="min-h-[60vh] bg-gray-50 dark:bg-gray-950 pb-16">
      <div className="flex gap-2 text-gray-500 dark:text-gray-400 p-4 items-center text-lg">
        <NavLink to="/" className="hover:text-blue-500 transition-colors">
          <IoHome />
        </NavLink>
        <span>{">"}</span>
        <span className="text-gray-800 dark:text-gray-200 font-medium">Cart</span>
      </div>

      {cartProducts.length === 0 ? (
        <div className="auth-card text-center max-w-md mx-auto mt-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Your cart is empty</p>
          <NavLink to="/" className="btn1 inline-block">Continue Shopping</NavLink>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row p-4 gap-6 container mx-auto max-w-6xl">
          <div className="w-full lg:w-2/3 space-y-4">
            {cartProducts.map((item, index) => (
              <CartItem
                value={item}
                dispatch={dispatch}
                key={item.productId}
              />
            ))}
          </div>
          <div className="lg:w-1/3 auth-card h-fit">
            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
              Order Summary
            </h3>
            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Discount (10%)</span>
                <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-semibold text-gray-800 dark:text-gray-200">
                  +${delivery.toFixed(2)}
                </span>
              </div>
            </div>
            <hr className="my-4 border-gray-200 dark:border-gray-700" />
            <div className="flex justify-between font-bold text-gray-900 dark:text-white">
              <span>Grand Total</span>
              <span className="textmainColor">${grandTotal.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="btn1 w-full mt-6 py-3 rounded-lg"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export const CartItem = ({ value, dispatch }) => {
  const lineTotal = (value.price * (value.quentity || 1)).toFixed(2)
  const isAdding = useSelector(selectIsCartPending(value.productId, "add"))
  const isUpdating = useSelector(selectIsCartPending(value.productId, "update"))
  const isRemoving = useSelector(selectIsCartPending(value.productId, "remove"))
  const itemBusy = isAdding || isUpdating || isRemoving

  const add = async () => {
    try {
      await dispatch(
        addToCartApi({ productId: value.productId, quantity: 1 })
      ).unwrap()
    } catch {
      toast.error("Failed to update cart")
    }
  }

  const remove = async () => {
    if (value.quentity <= 1) return
    try {
      await dispatch(
        updateCartQuantity({
          productId: value.productId,
          quantity: value.quentity - 1,
        })
      ).unwrap()
    } catch {
      toast.error("Failed to update cart")
    }
  }

  const dlt = async () => {
    try {
      await dispatch(removeFromCartApi(value.productId)).unwrap()
      toast.success("Item removed")
    } catch {
      toast.error("Failed to remove item")
    }
  }

  return (
    <div className="auth-card flex p-4 justify-between lg:pr-6 items-center gap-4">
      <div className="flex gap-4 flex-1 min-w-0">
        <div className="shrink-0 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="home-img-frame w-24 h-24 sm:w-32 sm:h-32">
            <img
              src={value.image}
              alt={value.name || value.title}
              className="w-full h-full object-contain p-2 mix-blend-multiply"
            />
          </div>
          <IconLoadingButton
            loading={isRemoving}
            onClick={dlt}
            className="w-full p-2 bg-gray-100 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-950 transition-colors text-red-500"
            aria-label="Remove item"
          >
            <MdDeleteOutline className="text-2xl" />
          </IconLoadingButton>
        </div>
        <div className="text-start pt-1 min-w-0">
          <h4 className="font-semibold text-gray-800 dark:text-white truncate">
            {value.name || value.title}
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            ${value.price} each
          </p>
          <p className="flex text-lg items-center gap-3 py-3">
            Qty :
            {itemBusy ? (
              <ButtonSpinner className="w-5 h-5 text-blue-500" />
            ) : (
              <>
                <FaRegSquareMinus
                  className={`${value.quentity <= 1 ? "text-gray-300 cursor-not-allowed" : "cursor-pointer text-2xl hover:text-blue-500"}`}
                  onClick={remove}
                />
                <span className="font-semibold min-w-[1.5rem] text-center">
                  {value.quentity}
                </span>
                <FaRegPlusSquare
                  className="cursor-pointer text-2xl hover:text-blue-500"
                  onClick={add}
                />
              </>
            )}
          </p>
          <p className="sm:hidden font-bold textmainColor">Subtotal: ${lineTotal}</p>
        </div>
      </div>
      <div className="hidden sm:block shrink-0">
        <p className="font-bold text-lg textmainColor">${lineTotal}</p>
      </div>
    </div>
  );
};

export default Cart
