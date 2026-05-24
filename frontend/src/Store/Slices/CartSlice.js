import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../config/apiClient.js";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/user/cart");
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch cart"
      );
    }
  }
);

export const addToCartApi = createAsyncThunk(
  "cart/addToCartApi",
  async ({ productId, quantity = 1 }, { rejectWithValue }) => {
    try {
      const response = await apiClient.post("/user/cart/add", {
        productId,
        quantity,
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to add to cart"
      );
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(`/user/cart/${productId}`, {
        quantity,
      });
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update cart"
      );
    }
  }
);

export const removeFromCartApi = createAsyncThunk(
  "cart/removeFromCartApi",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`/user/cart/${productId}`);
      return response.data.cart;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to remove item"
      );
    }
  }
);

const initialState = {
  cartProducts: [],
  status: "idle",
  error: null,
  pendingAction: null,
  pendingProductId: null,
};

const clearPending = (state) => {
  state.pendingAction = null;
  state.pendingProductId = null;
};

export const CartSlice = createSlice({
  name: "MyCart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartProducts = [];
      state.status = "idle";
      state.error = null;
      clearPending(state);
    },
    setCartFromServer: (state, action) => {
      state.cartProducts = action.payload;
    },
  },
  extraReducers: (builder) => {
    const setCart = (state, action) => {
      state.cartProducts = action.payload || [];
      state.status = "succeeded";
      clearPending(state);
    };
    const setFailed = (state, action) => {
      state.status = "failed";
      state.error = action.payload;
      clearPending(state);
    };

    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = "loading";
        state.pendingAction = "fetch";
        state.pendingProductId = null;
      })
      .addCase(fetchCart.fulfilled, setCart)
      .addCase(fetchCart.rejected, setFailed)
      .addCase(addToCartApi.pending, (state, action) => {
        state.status = "loading";
        state.pendingAction = "add";
        state.pendingProductId = action.meta.arg.productId;
      })
      .addCase(addToCartApi.fulfilled, setCart)
      .addCase(addToCartApi.rejected, setFailed)
      .addCase(updateCartQuantity.pending, (state, action) => {
        state.status = "loading";
        state.pendingAction = "update";
        state.pendingProductId = action.meta.arg.productId;
      })
      .addCase(updateCartQuantity.fulfilled, setCart)
      .addCase(updateCartQuantity.rejected, setFailed)
      .addCase(removeFromCartApi.pending, (state, action) => {
        state.status = "loading";
        state.pendingAction = "remove";
        state.pendingProductId = action.meta.arg;
      })
      .addCase(removeFromCartApi.fulfilled, setCart)
      .addCase(removeFromCartApi.rejected, setFailed);
  },
});

export const { clearCart, setCartFromServer } = CartSlice.actions;

export const selectIsCartPending = (productId, action) => (state) =>
  state.MyCart.pendingAction === action &&
  state.MyCart.pendingProductId === productId;

export default CartSlice.reducer;
