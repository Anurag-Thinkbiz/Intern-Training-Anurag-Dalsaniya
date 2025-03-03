import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { authSliceType,  } from "../../data/modal/types/reduxTypes/reduxType";

const initialState: authSliceType = {
  token:''
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        token: action.payload,
      };
    },
    logOut: (state) => {
      return {
        ...state,
        token: null,
      };
    },
  },
});

export const {logIn,logOut}=authSlice.actions;

export default authSlice.reducer;