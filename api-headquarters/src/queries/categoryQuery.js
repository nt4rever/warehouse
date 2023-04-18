export const CATEGORY_QUERY = {
  ALL: `SELECT * FROM Category`,
  CREATE: `INSERT INTO Category (CategoryID, CategoryName) VALUES(@CategoryID, @CategoryName);`,
  UPDATE: `UPDATE Category SET CategoryName=@CategoryName WHERE CategoryID=@CategoryID;`,
};
