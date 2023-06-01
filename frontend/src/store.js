import { configureStore } from "@reduxjs/toolkit";
import imageSlice from "./store/imageSlice";

const store = configureStore({
  reducer: {
    image: imageSlice,
  },
});

export default store;
