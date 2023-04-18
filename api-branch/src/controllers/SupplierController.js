import poolPromise from "../configs/connectDB";
import { SUPPLIER_QUERY } from "../queries/supplierQuery";
import { MESSAGES } from "../utils/messages";
import { SUPPLIER_MESSAGES } from "../utils/messages/supplier.message";

const all = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().query(SUPPLIER_QUERY.ALL);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const create = async (req, res) => {
  try {
    let { SupplierID, SupplierName, Address, PhoneNumber } = req.body;
    if (!SupplierID || !SupplierName)
      return res.status(400).json({
        message: SUPPLIER_MESSAGES.MISSING_FIELDS,
      });
    const pool = await poolPromise;
    await pool
      .request()
      .input("SupplierID", SupplierID)
      .input("SupplierName", SupplierName)
      .input("Address", Address)
      .input("PhoneNumber", PhoneNumber)
      .query(SUPPLIER_QUERY.CREATE);

    return res.status(201).json({ message: SUPPLIER_MESSAGES.CREATED });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const update = async (req, res) => {
  try {
    const SupplierID = req.params.id;
    let { SupplierName, Address, PhoneNumber } = req.body;
    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("SupplierID", SupplierID)
      .query(SUPPLIER_QUERY.BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: SUPPLIER_MESSAGES.NOT_FOUND,
      });

    const SUPPLIER = rows[0];
    SupplierName = SupplierName ? SupplierName : SUPPLIER.SupplierName;
    Address = Address ? Address : SUPPLIER.Address;
    PhoneNumber = PhoneNumber ? PhoneNumber : SUPPLIER.PhoneNumber;
    await pool
      .request()
      .input("SupplierID", SupplierID)
      .input("SupplierName", SupplierName)
      .input("Address", Address)
      .input("PhoneNumber", PhoneNumber)
      .query(SUPPLIER_QUERY.UPDATE);

    return res.status(200).json({
      message: SUPPLIER_MESSAGES.UPDATED,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { all, update, create };
