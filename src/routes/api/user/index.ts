import express from "express";
import MongoController from "../../../database/mongo";

const userRouter = express.Router();

userRouter.post("/join", async (req, res) => {
  const mongoController = new MongoController();
  let mongoConnection = null;
  try {
    mongoConnection = await mongoController.getConnection();
    await mongoConnection
      ?.db()
      .collection(mongoController.COLLECTIONS.USER)
      .insertOne(req.body);
    res.status(200);
  } catch {
    res.status(500);
  } finally {
    res.end();
    mongoConnection?.close();
  }
});

export default userRouter;
