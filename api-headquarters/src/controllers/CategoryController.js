import poolPromise from "../configs/connectDB";
import { CATEGORY_QUERY } from "../queries/categoryQuery";
import { MESSAGES } from "../utils/messages";
import { CATEGORY_MESSAGES } from "../utils/messages/category.message";

const all = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().query(CATEGORY_QUERY.ALL);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const update = async (req, res) => {
  try {
    let CategoryID = req.params.id;
    let { CategoryName } = req.body;
    if (!CategoryID || !CategoryName)
      return res.status(400).json({
        message: CATEGORY_MESSAGES.MISSING_FIELDS,
      });
    const pool = await poolPromise;
    await pool
      .request()
      .input("CategoryID", CategoryID)
      .input("CategoryName", CategoryName)
      .query(CATEGORY_QUERY.UPDATE);
    return res.status(201).json({ message: CATEGORY_MESSAGES.UPDATED });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { all, update };
