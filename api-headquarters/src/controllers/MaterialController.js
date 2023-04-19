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
      message: MESSAGES.ERROR,
    });
  }
};

const update = async (req, res) => {
  try {
    const MaterialID = req.params.id;
    let { MaterialName, Description, CategoryID, UnitID, Price, Image_URL } =
      req.body;
    const pool = await poolPromise;
    const { recordset: rows } = await pool
      .request()
      .input("MaterialID", MaterialID)
      .query(MATERIAL_QUERY.BY_ID);
    if (rows.length === 0)
      return res.status(404).json({
        message: MATERIAL_MESSAGES.NOT_FOUND,
      });

    const MATERIAL = rows[0];
    MaterialName = MaterialName || MATERIAL.MaterialName;
    CategoryID = CategoryID || MATERIAL.CategoryID;
    UnitID = UnitID || MATERIAL.UnitID;
    Price = Price || MATERIAL.Price;
    Description = Description ?? MATERIAL.Description;
    Image_URL = Image_URL ?? MATERIAL.Image_URL;

    await pool
      .request()
      .input("MaterialID", MaterialID)
      .input("MaterialName", MaterialName)
      .input("Description", Description)
      .input("CategoryID", CategoryID)
      .input("UnitID", UnitID)
      .input("Price", Price)
      .input("Image_URL", Image_URL)
      .query(MATERIAL_QUERY.UPDATE);

    return res.status(200).json({
      message: MATERIAL_MESSAGES.UPDATED,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: MESSAGES.ERROR,
    });
  }
};

export default { all, update };
