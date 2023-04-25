export const EXPORT_QUERY = {
  ALL: `SELECT ExportID, ExportDate, ord.OrderID,ord.CustomerID,ord.EmployeeID,ord.WarehouseID, ord.OrderDate, ord.TotalPrice,
  Customer.CustomerName, Customer.Address as CustomerAddress, Customer.PhoneNumber,
  Us.FirstName as EmployeeFirstName, Us.LastName as EmployeeLastName,
  Warehouse.WarehouseName
  FROM WareHouseExport
  JOIN [dbo].[Order] as Ord ON Ord.OrderID = WareHouseExport.OrderID
  JOIN Customer ON Customer.CustomerID= Ord.CustomerID
  JOIN Employee ON Employee.EmployeeID = WareHouseExport.EmployeeID
  JOIN Warehouse ON Warehouse.WarehouseID = Ord.WarehouseID
  JOIN [dbo].[User] as Us ON Us.UserID = Employee.UserID`,
  CREATE: `INSERT INTO WareHouseExport (ExportID,OrderID,EmployeeID,WarehouseID,ExportDate,TotalPrice)
  VALUES (@ExportID,@OrderID,@EmployeeID,@WarehouseID,@ExportDate,@TotalPrice);`,
  CHECK_EXIST: `SELECT OrderDetail.OrderID,
  OrderDetail.MaterialID,
  OrderDetail.Quantity,
  OrderDetail.Price,
  Material.MaterialName,
  Unit.UnitName,
  Category.CategoryName,
  (CASE
       WHEN OrderDetail.Quantity <=
              (SELECT Inventory.Quantity
               FROM Inventory
               WHERE Inventory.MaterialID=OrderDetail.MaterialID AND Inventory.WarehouseID=@WarehouseID) 
     THEN 1
       ELSE 0
   END) AS Status
FROM OrderDetail
JOIN Material ON Material.MaterialID=OrderDetail.MaterialID
JOIN Unit ON Unit.UnitID = Material.UnitID
JOIN Category ON Category.CategoryID=Material.CategoryID
WHERE OrderID=@OrderID`,
};
