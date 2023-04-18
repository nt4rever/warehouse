export const SUPPLIER_QUERY = {
  BY_ID: `SELECT * FROM Supplier WHERE SupplierID = @SupplierID`,
  ALL: `SELECT * FROM Supplier`,
  CREATE: `INSERT INTO Branch (SupplierID, SupplierName, Address, PhoneNumber) VALUES(@SupplierID, @SupplierName, @Address, @PhoneNumber);`,
  UPDATE: `UPDATE Branch SET SupplierName = @SupplierName, Address = @Address, PhoneNumber = @PhoneNumber WHERE SupplierID = @SupplierID;`
};
