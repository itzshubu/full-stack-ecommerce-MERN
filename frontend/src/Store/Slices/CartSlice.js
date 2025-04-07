import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'MyCart',
  initialState: {
    cartProducts: []
  },
  reducers: {
    removeByOne: (state, action) => {
      state.cartProducts = state.cartProducts.map((item) => {
        if (item.productId == action.payload) {
          return { ...item, quentity: item.quentity - 1 }
        } else {
          return item
        }
      })
    },
    deleteItem: (state, action) => {
      state.cartProducts = state.cartProducts.filter((item) => {
        return item.productId != action.payload
      })
    },
    addToCart: (state, action) => {
      // state.cartProducts.push(action.payload)
      let index
      let match = state.cartProducts.filter((obj, ind) => {
        if (obj.productId == action.payload.productId) {
          index = ind
        }
        return obj.productId == action.payload.productId
      })[0]
      if (match) {
        console.log("already present")
        match = { ...match, quentity: match.quentity + 1 }
        state.cartProducts.splice(index, 1, match)
      } else {
        console.log('not present')
        state.cartProducts.push({ ...action.payload, quentity: 1 })
      }
    }
  }
})

// Action creators are generated for each case reducer function
console.log(CartSlice)
export const { addToCart, removeByOne, deleteItem } = CartSlice.actions

export default CartSlice.reducer
