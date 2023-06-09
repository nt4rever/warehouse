import poolPromise from "../configs/connectDB";
import { EMPLOYEE_QUERY } from "../queries/employeeQuery";
import { MESSAGES } from "../utils/messages";

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
export default { getAll };
