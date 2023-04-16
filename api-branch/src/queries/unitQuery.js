export const UNIT_QUERY = {
  ALL: `SELECT * FROM Unit`,
  CREATE: `INSERT INTO Unit (UnitID, UnitName) VALUES(@UnitID, @UnitName);`,
};
