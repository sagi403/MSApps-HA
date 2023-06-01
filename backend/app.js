import express from "express";
import helmet from "helmet";
import cors from "cors";

import imageRoutes from "./routes/imageRoutes.js";

const app = express();

var corsOptions = {
  origin: "https://pixabay.com",
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use("/api/images", imageRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

export { app };
