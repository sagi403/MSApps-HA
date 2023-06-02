import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imagesApi from "../api/images";

const initialState = {
  loading: true,
  error: null,
  images: null,
};

export const getImages = createAsyncThunk(
  "image/getImages",
  async (page, thunkApi) => {
    try {
      const { data } = await imagesApi.get(
        `/api/images?pageNumber=${page || 1}`
      );

      return data.images;
    } catch (error) {
      const err =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;

      return thunkApi.rejectWithValue(err);
    }
  }
);

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    resetStatus: state => {
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getImages.pending, state => {
        state.loading = true;
      })
      .addCase(getImages.fulfilled, (state, action) => {
        state.loading = false;
        state.images = action.payload;
      })
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = imageSlice.actions;

export default imageSlice.reducer;
