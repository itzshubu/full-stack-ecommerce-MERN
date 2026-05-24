import { configureStore } from '@reduxjs/toolkit'
import { checkAuth } from './Slices/Authslice'
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

// Migrate away from localStorage auth (now httpOnly cookie)
localStorage.removeItem("token");
localStorage.removeItem("user");

storee.dispatch(checkAuth());
