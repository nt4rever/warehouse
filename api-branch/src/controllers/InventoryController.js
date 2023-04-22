import poolPromise from "../configs/connectDB";
import { INVENTORY_QUERY } from "../queries/inventoryQuery";
import { MESSAGES } from "../utils/messages";

const create = async (req, res) => {
  try {
    let { InventoryID, MaterialID, Quantity, WarehouseID } = req.body;
    if (!InventoryID || !MaterialID || !Quantity || !WarehouseID)
      return res.status(400).json({
        message: MESSAGES.MISSING_FIELDS,
      });
    const pool = await poolPromise;
    await pool
      .request()
      .input("InventoryID", InventoryID)
      .input("MaterialID", MaterialID)
      .input("Quantity", Quantity)
      .input("WarehouseID", WarehouseID)
      .query(INVENTORY_QUERY.CREATE);
    return res.status(201).json({
      message: MESSAGES.CREATED,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const all = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().query(INVENTORY_QUERY.ALL);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const update = async (req, res) => {
  try {
    let InventoryID = req.params.id;
    let { MaterialID, Quantity, WarehouseID } = req.body;
    if (!InventoryID || !MaterialID || !Quantity || !WarehouseID)
      return res.status(400).json({
        message: MESSAGES.MISSING_FIELDS,
      });
    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("InventoryID", InventoryID)
      .query(INVENTORY_QUERY.GET_BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: MESSAGES.NOT_FOUND_ITEM,
      });
    await pool
      .request()
      .input("InventoryID", InventoryID)
      .input("MaterialID", MaterialID)
      .input("Quantity", Quantity)
      .input("WarehouseID", WarehouseID)
      .query(INVENTORY_QUERY.UPDATE);
    return res.status(201).json({
      message: MESSAGES.UPDATED,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const destroy = async (req, res) => {
  try {
    let InventoryID = req.params.id;
    const pool = await poolPromise;
    await pool
      .request()
      .input("InventoryID", InventoryID)
      .query(INVENTORY_QUERY.DELETE);
    return res.status(201).json({
      message: MESSAGES.DELETED,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { all, create, update, destroy };
