import jwt from "jsonwebtoken";
import { promisify } from "util";
import configAuth from "../config/config";

export default async (req, res, next) => {
  const authHeads = req.headers.authorization;

  if (!authHeads) {
    res.status(401).json({ error: "Token Invalido" });
  }

  const [, token] = authHeads.split(" ");
  try {
    const decoded = await promisify(jwt.verify)(token, configAuth.secret);
    req.userId = decoded._id;
    return next();
  } catch (err) {
    return res.status(400).json({ error: "Token Invalido" });
  }
};
