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
    res.status(201);
  } catch (error) {
    res.status(500).send(error);
  } finally {
    res.end();
    mongoConnection?.close();
  }
});

userRouter.get("/join/check-unique", async (req, res) => {
  const { field, value } = req.query;
  if (typeof field !== "string" || typeof value !== "string")
    return res.status(422).end();
  const mongoController = new MongoController();
  let mongoConnection = null;
  try {
    mongoConnection = await mongoController.getConnection();
    const hasDocument = await mongoConnection
      ?.db()
      .collection(mongoController.COLLECTIONS.USER)
      .findOne({ [field]: value });
    res.status(200).json({
      isDup: !!hasDocument,
    });
  } catch (error) {
    res.status(500).send(error);
  } finally {
    res.end();
    mongoConnection?.close();
  }
});

export default userRouter;
