import express from "express";
import { getImageDetail, getImages } from "../controllers/imageControllers.js";

const router = express.Router();

router.get("/", getImages);
router.get("/:id", getImageDetail);

export default router;
