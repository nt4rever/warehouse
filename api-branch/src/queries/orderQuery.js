export const ORDER_QUERY = {
  ALL: `SELECT ord.OrderID,ord.CustomerID,ord.EmployeeID,ord.WarehouseID, ord.OrderDate, ord.TotalPrice,
  Customer.CustomerName, Customer.Address as CustomerAddress, Customer.PhoneNumber,
  Us.FirstName as EmployeeFirstName, Us.LastName as EmployeeLastName,
  Warehouse.WarehouseName
  FROM [dbo].[Order] as Ord
  JOIN Customer ON Customer.CustomerID= Ord.CustomerID
  JOIN Employee ON Employee.EmployeeID = Ord.EmployeeID
  JOIN Warehouse ON Warehouse.WarehouseID = Ord.WarehouseID
  JOIN [dbo].[User] as Us ON Us.UserID = Employee.UserID`,
  DETAIL: `SELECT OrderDetail.OrderID,OrderDetail.MaterialID,OrderDetail.Quantity,OrderDetail.Price,
  Material.MaterialName, Unit.UnitName, Category.CategoryName
  FROM OrderDetail
  JOIN Material ON Material.MaterialID=OrderDetail.MaterialID
  JOIN Unit ON Unit.UnitID = Material.UnitID
  JOIN Category ON Category.CategoryID =Material.CategoryID
  WHERE OrderID=@OrderID`,
  CREATE_ORDER: `INSERT INTO [dbo].[Order] (OrderID, CustomerID, WarehouseID, EmployeeID, OrderDate, TotalPrice) 
  VALUES (@OrderID,@CustomerID,@WarehouseID,@EmployeeID,@OrderDate,@TotalPrice)`,
  CREATE_ORDER_DETAIL: `INSERT INTO OrderDetail (MaterialID, OrderID,Quantity, Price) 
  VALUES (@MaterialID,@OrderID,@Quantity,@Price)`,
  UPDATE_ORDER: `UPDATE [dbo].[Order]
  SET TotalPrice=@TotalPrice
  WHERE OrderID=@OrderID`,
  UPDATE_ORDER_DETAIL: `UPDATE OrderDetail
  SET Quantity=@Quantity, Price=@Price
  WHERE OrderID=@OrderID AND MaterialID=@MaterialID`,
  DELETE: `DELETE FROM [dbo].[Order] WHERE OrderID=@OrderID`,
};
