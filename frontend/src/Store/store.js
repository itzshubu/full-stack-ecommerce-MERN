import { configureStore } from '@reduxjs/toolkit'
import { fetchProducts } from './Slices/productsSlice'
import productReducer from "./Slices/productsSlice"
import cartReducer  from "./Slices/CartSlice"
import FavReducer  from "./Slices/FavSlice"
import AuthReducer from "./Slices/Authslice"


export const storee = configureStore({
  reducer: {
    MyProducts : productReducer,
    MyCart : cartReducer,
    MyFav : FavReducer,
    MyAuth : AuthReducer
  },
})

storee.dispatch(fetchProducts())
