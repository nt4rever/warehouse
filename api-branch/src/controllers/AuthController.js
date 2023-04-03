import poolPromise from "../configs/connectDB";
import * as jwt from "jsonwebtoken";
import * as argon from "argon2";
import { AUTH_MESSAGES, MESSAGES } from "../utils/messages";
import { AUTH_QUERY } from "../queries/authQuery";
import { ROLES } from "../utils/constant";

// Our login logic starts here
const login = async (req, res) => {
  try {
    // Validate user input
    const { UserName, Password } = req.body;
    if (!UserName || !Password)
      return res.status(400).json({
        message: AUTH_MESSAGES.MISSING_CREDENTIALS,
      });

    // Validate if user exist in our database
    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("UserName", UserName)
      .query(AUTH_QUERY.LOGIN);

    if (rows.length === 0)
      return res.status(404).json({
        message: AUTH_MESSAGES.USER_NOT_FOUND,
      });

    const user = rows[0];

    // Validate Password and EMPLOYEE roles
    const verify = await argon.verify(user.Password, Password);
    if (!verify || user.RoleID !== ROLES.EMPLOYEE)
      return res.status(401).json({
        message: AUTH_MESSAGES.UNAUTHORIZED,
      });

    // Create token
    const token = jwt.sign(
      {
        UserID: user.UserID,
        UserName,
        role: user.RoleID,
      },
      "SECRET",
      {
        expiresIn: "7d",
      }
    );
    user.Token = token;
    delete user.Password;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const getProfile = async (req, res) => {
  try {
    const { UserName } = req.user;
    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("UserName", UserName)
      .query(AUTH_QUERY.LOGIN);

    if (rows.length === 0)
      return res.status(404).json({
        message: AUTH_MESSAGES.USER_NOT_FOUND,
      });

    const user = rows[0];
    delete user.Password;

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { login, getProfile };
