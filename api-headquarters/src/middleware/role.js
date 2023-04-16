import { AUTH_MESSAGES } from "../utils/messages";

const check =
  (...roles) =>
  (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        message: AUTH_MESSAGES.UNAUTHORIZED,
      });
    }

    const hasRole = roles.find((role) => req.user.role === role);
    if (!hasRole) {
      return res.status(401).json({
        message: AUTH_MESSAGES.UNAUTHORIZED,
      });
    }

    return next();
  };

export const role = { check };
