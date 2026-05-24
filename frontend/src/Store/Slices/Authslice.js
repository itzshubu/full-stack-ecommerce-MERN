import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../config/apiClient.js";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get("/user/me");
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Not authenticated");
    }
  }
);

const initialState = {
  user: null,
  status: "loading",
  error: null,
};

const authSlice = createSlice({
  name: "MyAuth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.user = action.payload.user;
      state.status = "succeeded";
      state.error = null;
    },
    logout: () => ({
      user: null,
      status: "succeeded",
      error: null,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.user = null;
        state.status = "succeeded";
        state.error = null;
      });
  },
});

export const { addAuth, logout } = authSlice.actions;
export default authSlice.reducer;
