import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "MyAuth",
    initialState: {
      user: null,
      token: localStorage.getItem("token") || null,
      status: "idle", // idle | loading | succeeded | failed
      error: null,
    },
    reducers: {
        addAuth :(state , action)=>{
              state.user = action.payload.user
              state.token = action.payload.token
        }
    },
    
  });
  
  export const {addAuth} = authSlice.actions
  export default authSlice.reducer;