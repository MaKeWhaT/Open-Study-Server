import express from "express";
import MongoController from "../../../database/mongo";
import { toSha256 } from "../../../utils/encryption";
import { sign, decode } from "../../../utils/jwt";
import { checkAuth } from "../../../middlewares/auth";

const userRouter = express.Router();

userRouter.post("/login", async (req, res) => {
  const mongoController = new MongoController();
  let mongoConnection = null;
  const { email, password } = req.body;
  const encryptedPassword = toSha256(password);
  try {
    mongoConnection = await mongoController.getConnection();
    const userAccount = await mongoConnection
      ?.db()
      .collection(mongoController.COLLECTIONS.USER)
      .findOne({ email, password: encryptedPassword });
    res.status(200).json({
      OK: !!userAccount,
      accessToken: userAccount ? sign(userAccount) : null,
    });
  } catch {
    res.status(500);
  } finally {
    res.end();
  }
});

userRouter.post("/join", async (req, res) => {
  const mongoController = new MongoController();
  let mongoConnection = null;
  const { email, password, nickname } = req.body;
  const encryptedPassword = toSha256(password);
  const initialUser = {
    email,
    password: encryptedPassword,
    nickname,
    level: 1,
    experience: 0,
    labels: [],
  };
  try {
    mongoConnection = await mongoController.getConnection();
    await mongoConnection
      ?.db()
      .collection(mongoController.COLLECTIONS.USER)
      .insertOne(initialUser);
    res.status(201).json({ accessToken: sign(initialUser) });
  } catch (error) {
    console.log(error);
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

userRouter.get("/me", checkAuth, async (req, res) => {
  try {
    res
      .status(200)
      .json(decode(req.headers.authorization?.split(" ")[1] as string));
  } catch {
    res.status(500);
  } finally {
    res.end();
  }
});

userRouter.get("/check-auth", checkAuth, (req, res) => {
  res.status(200).end();
});

export default userRouter;
