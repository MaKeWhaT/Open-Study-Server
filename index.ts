import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import UserRouter from "./src/routes/api/user";

dotenv.config();
const { PORT } = process.env ?? {};

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/user", UserRouter);

app.listen(PORT ?? 3000, () => {
  console.log(`App Listening On Port ${PORT ?? 3000}`);
});
