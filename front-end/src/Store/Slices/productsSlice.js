import { createSlice ,createAsyncThunk  } from '@reduxjs/toolkit'

// 🔹 Define an async thunk for fetching API data
export const fetchProducts = createAsyncThunk(
      "",
    async () => {
      const response = await fetch("http://localhost:3000/products");
      return await response.json();
    }
  );


const initialState = {
    products: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
}

export const productSlice = createSlice({
  name: 'MyProducts',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
})

export default productSlice.reducer
