import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  check: false,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    test: state => {
      state.check = true;
    },
  },
});

export const { test } = imageSlice.actions;

export default imageSlice.reducer;
