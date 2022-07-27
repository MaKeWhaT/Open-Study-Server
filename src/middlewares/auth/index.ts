import { RequestHandler } from "express";
import { verify } from "../../utils/jwt";

export const checkAuth: RequestHandler = (req, res, next) => {
  if (req.headers.authorization) {
    const accessToken = req.headers.authorization.split(" ")[1];
    if (verify(accessToken)) {
      return next();
    }
  }
  return res.status(401).end();
};
