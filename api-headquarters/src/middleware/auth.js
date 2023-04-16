import * as jwt from "jsonwebtoken";
import { extractToken } from "../utils/extractToken";
import { AUTH_MESSAGES } from "../utils/messages";

const verifyToken = (req, res, next) => {
  const token = extractToken(req);

  if (!token)
    return res.status(401).json({
      message: AUTH_MESSAGES.UNAUTHORIZED,
    });

  try {
    const decoded = jwt.verify(token, "SECRET");
    req.user = decoded;
  } catch (err) {
    return res.status(401).json({
      message: AUTH_MESSAGES.UNAUTHORIZED,
    });
  }

  return next();
};

export default verifyToken;
