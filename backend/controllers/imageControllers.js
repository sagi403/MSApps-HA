import asyncHandler from "express-async-handler";
import pixabayApi from "../api/pixabay.js";
import { keys } from "../keys.js";

// @desc    Fetch images
// @route   GET /api/images
// @access  Public
const getImages = asyncHandler(async (req, res) => {
  const pageSize = 9;

  const page = +req.query.pageNumber || 1;
  const category = req.query.pageNumber || "category";

  const { data } = await pixabayApi.get(`/?key=${keys.apiKey}&q=${category}`);

  res.json(data);
});

export { getImages };
