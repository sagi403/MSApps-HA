import express from "express";
import { getImages } from "../controllers/imageControllers.js";

const router = express.Router();

router.get("/", getImages);

export default router;
