import poolPromise from "../configs/connectDB";
import { CUSTOMER_QUERY } from "../queries/customerQuery";
import { MESSAGES } from "../utils/messages";
import { CUSTOMER_MESSAGES } from "./../utils/messages/customer.message";

const all = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().query(CUSTOMER_QUERY.ALL);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR
    });
  }
};

const create = async (req, res) => {
  try {
    let { CustomerID, CustomerName, Address, PhoneNumber } = req.body;
    if (!CustomerID || !CustomerName || !Address || !PhoneNumber)
      return res.status(400).json({
        message: CUSTOMER_MESSAGES.MISSING_FIELDS
      });
    const pool = await poolPromise;
    await pool
      .request()
      .input("CustomerID", CustomerID)
      .input("CustomerName", CustomerName)
      .input("Address", Address)
      .input("PhoneNumber", PhoneNumber)
      .query(CUSTOMER_QUERY.CREATE);

    return res.status(201).json({ message: CUSTOMER_MESSAGES.CREATED });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR
    });
  }
};

const update = async (req, res) => {
  try {
    const CustomerID = req.params.id;
    let { CustomerName, Address, PhoneNumber } = req.body;
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().input("CustomerID", CustomerID).query(CUSTOMER_QUERY.BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: CUSTOMER_MESSAGES.NOT_FOUND
      });

    const CUSTOMER = rows[0];
    CustomerName = CustomerName ? CustomerName : CUSTOMER.CustomerName;
    Address = Address ? Address : CUSTOMER.Address;
    PhoneNumber = PhoneNumber ? PhoneNumber : CUSTOMER.PhoneNumber;
    await pool
      .request()
      .input("CustomerID", CustomerID)
      .input("CustomerName", CustomerName)
      .input("Address", Address)
      .input("PhoneNumber", PhoneNumber)
      .query(CUSTOMER_QUERY.UPDATE);

    return res.status(200).json({
      message: CUSTOMER_MESSAGES.UPDATED
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: MESSAGES.ERROR
    });
  }
};

export default { all, update, create };
