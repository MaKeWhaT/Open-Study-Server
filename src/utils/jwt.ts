import jwt from "jsonwebtoken";

export const sign = (payload: string | object | Buffer) => {
  const { JWT_SECRET_KEY } = process.env ?? {};
  return jwt.sign(payload, JWT_SECRET_KEY as string, {
    algorithm: "HS256",
    expiresIn: "1d",
  });
};

export const verify = (accessToken: string) => {
  const { JWT_SECRET_KEY } = process.env ?? {};
  try {
    jwt.verify(accessToken, JWT_SECRET_KEY as string);
    return true;
  } catch {
    return false;
  }
};

export const decode = (accessToken: string) => {
  return jwt.decode(accessToken);
};
