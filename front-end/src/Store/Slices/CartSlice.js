import { createSlice } from '@reduxjs/toolkit'

export const CartSlice = createSlice({
  name: 'MyCart',
  initialState: {
    cartProducts: [{
      "id": 1,
      "name": "Slim Fit Casual Shirt",
      "main_category": "Men's Wear",
      "subcategory": "Shirts",
      "quentity": 3,
      "type": "upper",
      "image": "https://m.media-amazon.com/images/I/81FPwnSfn0L._AC_UL480_FMwebp_QL65_.jpg",
      "rating": 4,
      "quentity": 5,
      "price": 29.99,
      "description": "A stylish slim-fit casual shirt, perfect for both office and weekend wear. Made with breathable cotton fabric."
    }]
  },
  reducers: {
    removeByOne: (state, action) => {
        state.cartProducts =  state.cartProducts.map((item)=>{
                      if(item.id == action.payload){  
                             return {...item , quentity : item.quentity -1}
                      }else{
                             return item
                      }
        })
    },
    deleteItem : (state , action)=>{
             state.cartProducts = state.cartProducts.filter((item)=>{
              return item.id != action.payload
             })
    },
    addToCart: (state, action) => {
      // state.cartProducts.push(action.payload)
      let index
      let match = state.cartProducts.filter((obj, ind) => {
        if (obj.id == action.payload.id) {
          index = ind
        }
        return obj.id == action.payload.id
      })[0]
      if (match) {
        console.log("already present")
         match = {...match , quentity : match.quentity + 1}
        state.cartProducts.splice(index,1,match)
      } else {
        console.log('not present')
        state.cartProducts.push({ ...action.payload, quentity: 1 })
      }
    }
  }
})

// Action creators are generated for each case reducer function
console.log(CartSlice)
export const { addToCart , removeByOne ,deleteItem } = CartSlice.actions

export default CartSlice.reducer
