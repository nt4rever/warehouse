import poolPromise from "../configs/connectDB";
import { MATERIAL_QUERY } from "../queries/materialQuery";
import { MESSAGES } from "../utils/messages";
import { MATERIAL_MESSAGES } from "../utils/messages/material.message";

const all = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().query(MATERIAL_QUERY.ALL);
    return res.status(200).json(rows);
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR
    });
  }
};

const create = async (req, res) => {
  try {
    let { MaterialID, MaterialName, Description, CategoryID, UnitID, Price } = req.body;
    if (!MaterialID || !MaterialName || !Description || !CategoryID || !UnitID || !Price)
      return res.status(400).json({
        message: MATERIAL_MESSAGES.MISSING_FIELDS
      });
    const pool = await poolPromise;
    await pool
      .request()
      .input("MaterialID", MaterialID)
      .input("MaterialName", MaterialName)
      .input("Description", Description)
      .input("CategoryID", CategoryID)
      .input("UnitID", UnitID)
      .input("Price", Price)
      .query(MATERIAL_QUERY.CREATE);
    return res.status(201).json({ message: MATERIAL_MESSAGES.CREATED });
  } catch (error) {
    return res.status(400).json({
      message: MESSAGES.ERROR
    });
  }
};

const update = async (req, res) => {
  try {
    const MaterialID = req.params.id;
    let { MaterialName, Description, CategoryID, UnitID, Price } = req.body;
    const pool = await poolPromise;
    const { recordset: rows } = await pool.request().input("MaterialID", MaterialID).query(MATERIAL_QUERY.BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: MATERIAL_MESSAGES.NOT_FOUND
      });

    const MATERIAL = rows[0];
    MaterialName = MaterialName ? MaterialName : MATERIAL.MaterialName;
    Description = Description ? Description : MATERIAL.Description;
    CategoryID = CategoryID ? CategoryID : MATERIAL.CategoryID;
    UnitID = UnitID ? UnitID : MATERIAL.UnitID;
    Price = Price ? Price : MATERIAL.Price;

    await pool
      .request()
      .input("MaterialID", MaterialID)
      .input("MaterialName", MaterialName)
      .input("Description", Description)
      .input("CategoryID", CategoryID)
      .input("UnitID", UnitID)
      .input("Price", Price)
      .query(MATERIAL_QUERY.UPDATE);

    return res.status(200).json({
      message: MATERIAL_MESSAGES.UPDATED
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: MESSAGES.ERROR
    });
  }
};

export default { create, all, update };
