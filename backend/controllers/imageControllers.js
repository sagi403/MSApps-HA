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

  const { data } = await pixabayApi.get(
    `/?key=${keys.apiKey}&q=${category}&per_page=${pageSize}&page=${page}`
  );

  const imagesDetails = data.hits.sort((a, b) => a.id - b.id);

  const images = imagesDetails.map(image => image.webformatURL);

  if (images.length !== 0) {
    res.json({ images });
  } else {
    res.status(404);
    throw new Error("There are no images available");
  }
});

export { getImages };
