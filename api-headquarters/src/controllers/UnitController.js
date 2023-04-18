import poolPromise from "../configs/connectDB";
import { UNIT_QUERY } from "../queries/unitQuery";
import { MESSAGES } from "../utils/messages";
import { UNIT_MESSAGES } from "../utils/messages";

const all = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().query(UNIT_QUERY.ALL);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const update = async (req, res) => {
  try {
    let UnitID = req.params.id;
    let { UnitName } = req.body;
    if (!UnitID || !UnitName)
      return res.status(400).json({
        message: UNIT_MESSAGES.MISSING_FIELDS,
      });
    const pool = await poolPromise;
    await pool
      .request()
      .input("UnitID", UnitID)
      .input("UnitName", UnitName)
      .query(UNIT_QUERY.UPDATE);
    return res.status(201).json({ message: UNIT_MESSAGES.CREATED });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { all, update };
