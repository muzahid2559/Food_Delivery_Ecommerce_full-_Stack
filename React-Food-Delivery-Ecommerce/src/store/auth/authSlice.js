import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: undefined,
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
  },
});

export const { setUserType, setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
