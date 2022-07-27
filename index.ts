import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./src/routes/api/user";

dotenv.config();
const { PORT } = process.env ?? {};

const app = express();

app.use(
  cors({
    origin: "http://local.open-study.com:3000",
    credentials: true,
  }),
);
app.use(express.json());

app.use("/api/user", UserRouter);

app.listen(PORT ?? 3000);
