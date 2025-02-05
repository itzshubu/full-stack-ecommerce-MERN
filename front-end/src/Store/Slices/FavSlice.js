import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    favproducts: [{
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
}

export const FavSlice = createSlice({
    name: 'MyFav',
    initialState,
    reducers: {
        Togglefav: (state, action) => {
            console.log("helli ")
            let index
            let match = state.favproducts.filter((obj, ind) => {
                if (obj.id == action.payload.id) {
                    index = ind
                }
                return obj.id == action.payload.id
            })[0]
            if(match){
                state.favproducts.splice(index , 1)
            }else {
                state.favproducts.push(action.payload)
            }
        },
    },
})

// Action creators are generated for each case reducer function
export const { Togglefav } = FavSlice.actions

export default FavSlice.reducer

