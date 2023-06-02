import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import imagesApi from "../api/images";

const initialState = {
  loading: true,
  error: null,
  images: localStorage.getItem("imagesList")
    ? JSON.parse(localStorage.getItem("imagesList"))
    : null,
};

export const getImages = createAsyncThunk(
  "image/getImages",
  async ({ page = 1, category = "category" }, thunkApi) => {
    const imagesState = thunkApi.getState()?.image?.images;

    if (
      imagesState &&
      imagesState.page === page &&
      imagesState.category === category
    ) {
      return imagesState;
    }

    try {
      const { data } = await imagesApi.get(
        `/api/images?pageNumber=${page}&category=${category}`
      );

      return { page, category, urls: data.images };
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

        localStorage.setItem("imagesList", JSON.stringify(state.images));
      })
      .addCase(getImages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetStatus } = imageSlice.actions;

export default imageSlice.reducer;
