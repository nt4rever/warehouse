export const WAREHOUSE_QUERY = {
  BY_BRANCH_ID: `SELECT Warehouse.WarehouseID, Warehouse.WarehouseName, Warehouse.Address, Warehouse.PhoneNumber,
  Branch.BranchID, Branch.BranchName FROM Warehouse JOIN Branch ON Warehouse.BranchID = Branch.BranchID WHERE Warehouse.BranchID = @BranchID`,
  BY_ID: `SELECT * FROM Warehouse WHERE WarehouseID = @WarehouseID;`,
  ALL: `SELECT Warehouse.WarehouseID, Warehouse.WarehouseName, Warehouse.Address, Warehouse.PhoneNumber,
  Branch.BranchID, Branch.BranchName FROM Warehouse JOIN Branch ON Warehouse.BranchID = Branch.BranchID;`,
  CREATE: `INSERT INTO Warehouse VALUES(@WarehouseID, @WarehouseName, @BranchID, @Address, @PhoneNumber);`,
  UPDATE: `UPDATE Warehouse SET WarehouseName = @WarehouseName, Address = @Address, PhoneNumber = @PhoneNumber WHERE WarehouseID = @WarehouseID;`,
  DELETE: `DELETE FROM Warehouse WHERE WarehouseID = @WarehouseID;`,
};
