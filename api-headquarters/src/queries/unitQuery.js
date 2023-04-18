export const UNIT_QUERY = {
  ALL: `SELECT * FROM Unit`,
  CREATE: `INSERT INTO Unit (UnitID, UnitName) VALUES(@UnitID, @UnitName);`,
  UPDATE: `UPDATE Unit SET UnitName=@UnitName WHERE UnitID=@UnitID;`,
};
