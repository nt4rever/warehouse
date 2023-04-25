import poolPromise from "../configs/connectDB";
import { EXPORT_QUERY } from "../queries/exportQuery";
import { INVENTORY_QUERY } from "../queries/inventoryQuery";
import { ORDER_QUERY } from "../queries/orderQuery";
import { MESSAGES } from "../utils/messages";

const create = async (req, res) => {
  try {
    let { ExportID, OrderID } = req.body;
    // get EmployeeID
    const { UserID } = req.user;
    const pool = await poolPromise;
    const { recordsets: rows } = await pool
      .request()
      .query(`SELECT * FROM Employee WHERE UserID='${UserID}'`);
    const EmployeeID = rows[0][0].EmployeeID;

    // get Order
    const { recordsets: rowsOrder } = await pool
      .request()
      .input("OrderID", OrderID)
      .query(ORDER_QUERY.GET_BY_ID);
    const order = rowsOrder[0][0];

    //get items exist in inventory
    const { recordsets: rowsItemInventory } = await pool
      .request()
      .input("OrderID", OrderID)
      .input("WarehouseID", order.WarehouseID)
      .query(EXPORT_QUERY.CHECK_EXIST);

    const statusArr = rowsItemInventory[0].map((item) => item.Status);
    if (statusArr.some((x) => x === 0))
      return res.status(400).json({
        message: "Lack of items in inventory",
      });

    let ExportDate = new Date().toISOString();

    await pool
      .request()
      .input("ExportID", ExportID)
      .input("OrderID", OrderID)
      .input("EmployeeID", EmployeeID)
      .input("WarehouseID", order.WarehouseID)
      .input("ExportDate", ExportDate)
      .input("TotalPrice", order.TotalPrice)
      .query(EXPORT_QUERY.CREATE);

    await pool.request().input("OrderID", OrderID).query(INVENTORY_QUERY.SUB);

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
    const { recordsets: rows } = await pool.request().query(EXPORT_QUERY.ALL);
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { all, create };
