import { createSlice } from "@reduxjs/toolkit";

 const initialState = {
  user: localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
  token: localStorage.getItem('token')?? null,
  status: "idle", // idle | loading | succeeded | failed
  error: null,
}

const authSlice = createSlice({
    name: "MyAuth",
    initialState,
    reducers: {
        addAuth :(state , action)=>{
              state.user = action.payload.user
              state.token = action.payload.token
        } ,
        logout: (state) => {
          return initialState; // Reset state to initial values
        },
    },
    
  });
  
  export const {addAuth , logout} = authSlice.actions
  export default authSlice.reducer;