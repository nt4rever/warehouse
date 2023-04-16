import poolPromise from "../configs/connectDB";
import { BRANCH_QUERY } from "../queries/branchQuery";
import { MESSAGES } from "../utils/messages";

const getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().query(BRANCH_QUERY.ALL);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const update = async (req, res) => {
  try {
    const BranchID = req.params.id;
    let { BranchName, Address, PhoneNumber } = req.body;
    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("BranchID", BranchID)
      .query(BRANCH_QUERY.BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: BRANCH_MESSAGES.NOT_FOUND,
      });

    const branch = rows[0];
    BranchName = BranchName ? BranchName : branch.BranchName;
    Address = Address ? Address : branch.Address;
    PhoneNumber = PhoneNumber ? PhoneNumber : branch.PhoneNumber;
    await pool
      .request()
      .input("BranchID", BranchID)
      .input("BranchName", BranchName)
      .input("Address", Address)
      .input("PhoneNumber", PhoneNumber)
      .query(BRANCH_QUERY.UPDATE);

    return res.status(200).json({
      message: BRANCH_MESSAGES.UPDATED,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { getAll, update };
