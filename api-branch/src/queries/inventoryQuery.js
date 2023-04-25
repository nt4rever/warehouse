export const INVENTORY_QUERY = {
  ALL: `SELECT InventoryID, Quantity,Warehouse.WarehouseID,Warehouse.WarehouseName,
  Material.MaterialID,Material.MaterialName,
  Unit.UnitID, Unit.UnitName,
  Category.CategoryID, Category.CategoryName
  FROM Inventory JOIN Warehouse ON Inventory.WarehouseID=Warehouse.WarehouseID 
  JOIN Material ON Material.MaterialID = Inventory.MaterialID
  JOIN Unit ON Unit.UnitID = Material.UnitID
  JOIN Category ON Category.CategoryID = Material.CategoryID;`,
  GET_BY_ID: `SELECT * FROM Inventory WHERE InventoryID=@InventoryID;`,
  CREATE: `INSERT INTO Inventory (InventoryID,MaterialID,Quantity,WarehouseID) VALUES (@InventoryID,@MaterialID,@Quantity,@WarehouseID);`,
  UPDATE: `UPDATE Inventory SET MaterialID=@MaterialID, Quantity=@Quantity, WarehouseID=@WarehouseID
  WHERE InventoryID=@InventoryID;`,
  UPDATE_QUANTITY: `UPDATE Inventory SET Quantity=@Quantity WHERE MaterialID=@MaterialID;`,
  DELETE: `DELETE FROM Inventory WHERE InventoryID=@InventoryID;`,
  SUB: `UPDATE Inventory SET Quantity = inv.Quantity - ords.Quantity 
  FROM Inventory inv
  INNER JOIN OrderDetail ords on ords.MaterialID = inv.MaterialID
  INNER JOIN [dbo].[Order] ord on ord.OrderID = ords.OrderID and ord.WarehouseID = inv.WarehouseID
  WHERE ord.OrderID = @OrderID`,
};
