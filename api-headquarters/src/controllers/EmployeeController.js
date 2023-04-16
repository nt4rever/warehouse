import poolPromise from "../configs/connectDB";
import { EMPLOYEE_QUERY } from "../queries/employeeQuery";
import { USER_QUERY } from "../queries/userQuery";
import { ROLES } from "../utils/constant";
import { AUTH_MESSAGES, EMPLOYEE_MESSAGES, MESSAGES } from "../utils/messages";

const createEmployee = async (req, res) => {
  try {
    // validate fields
    const { EmployeeID, UserID, BranchID } = req.body;
    if (!EmployeeID || !UserID || !BranchID)
      return res.status(400).json({
        message: EMPLOYEE_MESSAGES.MISSING_FIELDS,
      });

    // check user exist and have EMPLOYEE role
    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("Id", UserID)
      .query(USER_QUERY.GET_BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: AUTH_MESSAGES.USER_NOT_FOUND,
      });
    const user = rows[0];
    if (user.RoleID !== ROLES.EMPLOYEE)
      return res.status(401).json({
        message: AUTH_MESSAGES.UNAUTHORIZED,
      });

    // create employee
    await pool
      .request()
      .input("EmployeeID", EmployeeID)
      .input("UserID", UserID)
      .input("BranchID", BranchID)
      .query(EMPLOYEE_QUERY.CREATE);

    return res.status(201).json({ message: EMPLOYEE_MESSAGES.CREATED });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().query(EMPLOYEE_QUERY.ALL);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};
export default { createEmployee, getAll };
