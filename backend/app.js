import express from "express";
import helmet from "helmet";
import cors from "cors";

import imageRoutes from "./routes/imageRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

var corsOptions = {
  origin: ["http://localhost:5173", "https://my-other-trusted-origin.com"],
};

app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

app.use("/api/images", imageRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use(notFound);
app.use(errorHandler);

export { app };
