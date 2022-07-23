import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const { PORT } = process.env ?? {};
const app = express();

app.use(cors());
app.use(express.json());

app.listen(PORT ?? 3000, () => {
  console.log(`App Listening On Port ${PORT ?? 3000}`);
});
