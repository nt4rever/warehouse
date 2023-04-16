export const CATEGORY_QUERY = {
  ALL: `SELECT * FROM Category`,
  CREATE: `INSERT INTO Category VALUES(@CategoryID, @CategoryName);`,
};
