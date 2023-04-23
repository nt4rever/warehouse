import poolPromise from "../configs/connectDB";
import { ORDER_QUERY } from "../queries/orderQuery";
import { MESSAGES } from "../utils/messages";

const create = async (req, res) => {
  try {
    /*
    mock Body
    OrderID - CustomerID - EmployeeID - OrderDate - TotalPrice
    OrderDetails: [
      {
        MaterialID - Quantity - Price
      },
      ...
    ]
    */
    let {
      OrderID,
      CustomerID,
      WarehouseID,
      OrderDate,
      TotalPrice,
      OrderDetails,
    } = req.body;
    if (!OrderID || !CustomerID || !WarehouseID || !Array.isArray(OrderDetails))
      return res.status(400).json({
        message: MESSAGES.MISSING_FIELDS,
      });
    OrderDate = OrderDate || new Date().toISOString();
    TotalPrice = Number(TotalPrice) || 0;
    const pool = await poolPromise;

    // get EmployeeID
    const { UserID } = req.user;
    const { recordsets: rows } = await pool
      .request()
      .query(`SELECT * FROM Employee WHERE UserID='${UserID}'`);
    const EmployeeID = rows[0][0].EmployeeID;
    await pool
      .request()
      .input("OrderID", OrderID)
      .input("CustomerID", CustomerID)
      .input("EmployeeID", EmployeeID)
      .input("WarehouseID", WarehouseID)
      .input("OrderDate", OrderDate)
      .input("TotalPrice", TotalPrice)
      .query(ORDER_QUERY.CREATE_ORDER);

    for (const order of OrderDetails) {
      let { MaterialID, Quantity, Price } = order;
      await pool
        .request()
        .input("OrderID", OrderID)
        .input("MaterialID", MaterialID)
        .input("Quantity", Quantity)
        .input("Price", Price)
        .query(ORDER_QUERY.CREATE_ORDER_DETAIL);
    }

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
    const { recordsets: rows } = await pool.request().query(ORDER_QUERY.ALL);
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const detail = async (req, res) => {
  try {
    let OrderID = req.params.id;
    const pool = await poolPromise;
    const { recordsets: rows } = await pool
      .request()
      .input("OrderID", OrderID)
      .query(ORDER_QUERY.DETAIL);
    return res.status(200).json(rows[0]);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const updateOrder = async (req, res) => {
  try {
    let { OrderID, MaterialID, Quantity, Price, Type } = req.body;
    if (!OrderID || !MaterialID || !Quantity || !Price || !Type)
      return res.status(400).json({
        message: MESSAGES.MISSING_FIELDS,
      });
    const pool = await poolPromise;
    await pool
      .request()
      .input("OrderID", OrderID)
      .input("MaterialID", MaterialID)
      .input("Quantity", Quantity)
      .input("Price", Price)
      .query(
        Type === "UPDATED"
          ? ORDER_QUERY.UPDATE_ORDER_DETAIL
          : ORDER_QUERY.CREATE_ORDER_DETAIL
      );

    // get order details
    const { recordsets: rows } = await pool
      .request()
      .input("OrderID", OrderID)
      .query(ORDER_QUERY.DETAIL);
    const orders = rows[0];
    // calculate and update new total price
    const totalPrice = orders.reduce(
      (acc, value) => acc + value.Price * value.Quantity,
      0
    );
    await pool
      .request()
      .input("OrderID", OrderID)
      .input("TotalPrice", totalPrice)
      .query(ORDER_QUERY.UPDATE_ORDER);
    return res.status(200).json({
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
    let OrderID = req.params.id;
    const pool = await poolPromise;
    await pool.request().input("OrderID", OrderID).query(ORDER_QUERY.DELETE);
    return res.status(200).json({
      message: MESSAGES.DELETED,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

const destroyDetail = async (req, res) => {
  try {
    let { OrderID, MaterialID } = req.body;
    if (!OrderID || !MaterialID)
      return res.status(400).json({
        message: MESSAGES.MISSING_FIELDS,
      });
    const pool = await poolPromise;
    await pool
      .request()
      .input("OrderID", OrderID)
      .input("MaterialID", MaterialID)
      .query(ORDER_QUERY.DELETE_DETAIL);

    // get order details
    const { recordsets: rows } = await pool
      .request()
      .input("OrderID", OrderID)
      .query(ORDER_QUERY.DETAIL);
    const orders = rows[0];
    // calculate and update new total price
    const totalPrice = orders.reduce(
      (acc, value) => acc + value.Price * value.Quantity,
      0
    );
    await pool
      .request()
      .input("OrderID", OrderID)
      .input("TotalPrice", totalPrice)
      .query(ORDER_QUERY.UPDATE_ORDER);
    return res.status(200).json({
      message: MESSAGES.DELETED,
    });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { all, create, detail, updateOrder, destroy, destroyDetail };
