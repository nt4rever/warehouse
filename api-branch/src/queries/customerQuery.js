export const CUSTOMER_QUERY = {
  BY_ID: `SELECT * FROM Customer WHERE CustomerID = @CustomerID;`,
  ALL: `SELECT * FROM Customer`,
  CREATE: `INSERT INTO Customer (CustomerID, CustomerName, Address, PhoneNumber) VALUES(@CustomerID, @CustomerName, @Address, @PhoneNumber);`,
  UPDATE: `UPDATE Customer SET CustomerName = @CustomerName, Address = @Address, PhoneNumber = @PhoneNumber WHERE CustomerID = @CustomerID;`,
};
