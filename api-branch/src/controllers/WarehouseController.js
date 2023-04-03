import poolPromise from "../configs/connectDB";
import { WAREHOUSE_QUERY } from "../queries/warehouseQuery";
import { MESSAGES, WAREHOUSE_MESSAGES } from "../utils/messages";

const getAll = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().query(WAREHOUSE_QUERY.ALL);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const create = async (req, res) => {
  try {
    const { WarehouseID, WarehouseName, BranchID, Address, PhoneNumber } =
      req.body;
    if (!WarehouseID || !WarehouseName || !BranchID || !Address)
      return res.status(400).json({
        message: WAREHOUSE_MESSAGES.MISSING_FIELDS,
      });
    const pool = await poolPromise;
    await pool
      .request()
      .input("WarehouseID", WarehouseID)
      .input("WarehouseName", WarehouseName)
      .input("BranchID", BranchID)
      .input("Address", Address)
      .input("PhoneNumber", PhoneNumber)
      .query(WAREHOUSE_QUERY.CREATE);
    return res.status(201).json({
      message: WAREHOUSE_MESSAGES.CREATED,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const update = async (req, res) => {
  try {
    const WarehouseID = req.params.id;
    let { WarehouseName, Address, PhoneNumber } = req.body;

    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("WarehouseID", WarehouseID)
      .query(WAREHOUSE_QUERY.BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: WAREHOUSE_MESSAGES.NOT_FOUND,
      });

    const warehouse = rows[0];
    console.log(warehouse);
    WarehouseName = WarehouseName ? WarehouseName : warehouse.WarehouseName;
    Address = Address ? Address : warehouse.Address;
    PhoneNumber = PhoneNumber ? PhoneNumber : warehouse.PhoneNumber;
    await pool
      .request()
      .input("WarehouseID", WarehouseID)
      .input("WarehouseName", WarehouseName)
      .input("Address", Address)
      .input("PhoneNumber", PhoneNumber)
      .query(WAREHOUSE_QUERY.UPDATE);
    return res.status(200).json({
      message: WAREHOUSE_MESSAGES.UPDATED,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { create, getAll, update };
