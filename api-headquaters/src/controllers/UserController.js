import poolPromise from "../configs/connectDB";
import * as argon from "argon2";
import { AUTH_MESSAGES, MESSAGES, USER_MESSAGES } from "../utils/messages";
import { USER_QUERY } from "../queries/userQuery";
import { ROLES } from "../utils/constant";

const createUser = async (req, res) => {
  try {
    const {
      RoleID,
      UserID,
      UserName,
      Password,
      FirstName,
      LastName,
      Gender,
      Email,
      Address,
      PhoneNumber,
      Birthday,
    } = req.body;

    if (
      !RoleID ||
      !UserID ||
      !UserName ||
      !Password ||
      !FirstName ||
      (RoleID !== ROLES.ADMIN && RoleID !== ROLES.EMPLOYEE)
    )
      return res.status(400).json({
        message: USER_MESSAGES.MISSING_FIELDS,
      });

    const PasswordHash = await argon.hash(Password);
    const pool = await poolPromise;
    await pool
      .request()
      .input("UserID", UserID)
      .input("UserName", UserName)
      .input("Password", PasswordHash)
      .input("FirstName", FirstName)
      .input("LastName", LastName)
      .input("Gender", Gender)
      .input("Email", Email)
      .input("Address", Address)
      .input("PhoneNumber", PhoneNumber)
      .input("Birthday", Birthday)
      .query(USER_QUERY.CREATE);

    await pool
      .request()
      .input("UserID", UserID)
      .input("RoleID", RoleID)
      .query(USER_QUERY.ATTACH_ROLE);

    return res.status(201).json({ message: USER_MESSAGES.CREATED });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordsets: rows } = await pool.request().query(USER_QUERY.ALL);
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("Id", id)
      .query(USER_QUERY.GET_BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: AUTH_MESSAGES.USER_NOT_FOUND,
      });
    const user = rows[0];
    delete user.Password;
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const deleteById = async (req, res) => {
  try {
    const user = req.user;
    const id = req.params.id;
    if (user.UserID === id || user.UserName === id)
      return res.status(400).json({
        message: MESSAGES.ERROR,
      });
    const pool = await poolPromise;
    await pool.request().input("Id", id).query(USER_QUERY.DELETE);
    return res.status(200).json({
      message: USER_MESSAGES.DELETED,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const updateById = async (req, res) => {
  try {
    const id = req.params.id;

    let {
      Password,
      FirstName,
      LastName,
      Gender,
      Email,
      Address,
      PhoneNumber,
      Birthday,
    } = req.body;

    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("Id", id)
      .query(USER_QUERY.GET_BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: AUTH_MESSAGES.USER_NOT_FOUND,
      });

    const user = rows[0];

    // check if user change password
    if (Password) Password = await argon.hash(Password);
    else Password = user.Password;

    // check new value, otherwise set current value of user
    FirstName = FirstName ? FirstName : user.FirstName;
    LastName = LastName ? LastName : user.LastName;
    Gender = Gender ? Gender : user.Gender;
    Email = Email ? Email : user.Email;
    Address = Address ? Address : user.Address;
    PhoneNumber = PhoneNumber ? PhoneNumber : user.PhoneNumber;
    Birthday = Birthday ? Birthday : user.Birthday;

    await pool
      .request()
      .input("UserID", user.UserID)
      .input("Password", Password)
      .input("FirstName", FirstName)
      .input("LastName", LastName)
      .input("Gender", Gender)
      .input("Email", Email)
      .input("Address", Address)
      .input("PhoneNumber", PhoneNumber)
      .input("Birthday", Birthday)
      .query(USER_QUERY.UPDATE);

    return res.status(200).json({
      message: USER_MESSAGES.UPDATED,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { createUser, getAll, getById, deleteById, updateById };
