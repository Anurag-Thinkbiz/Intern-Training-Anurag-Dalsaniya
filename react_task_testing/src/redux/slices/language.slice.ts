import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";
import { languageReduxType } from "../../data/modal/types/reduxTypes/reduxType";
import { languages } from "../../utils/Constants/languageConstant";

const initialState: languageReduxType = {
  language: languages[0].value,
};

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    changeLanguage: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        language: action.payload,
      };
    },
  },
});

export const { changeLanguage } = languageSlice.actions;

export default languageSlice.reducer;
