export const EMPLOYEE_QUERY = {
  ALL: `SELECT EmployeeID, Branch.BranchID, [dbo].[User].UserId, UserName, [dbo].[User].FirstName, [dbo].[User].LastName,
  [dbo].[User].Gender, [dbo].[User].Email, [dbo].[User].Address, [dbo].[User].PhoneNumber, [dbo].[User].Birthday, Branch.BranchName
  FROM Employee JOIN [dbo].[User] ON [dbo].[User].UserID = Employee.UserID JOIN Branch ON Branch.BranchID = Employee.BranchID`,
  CREATE: `INSERT INTO Employee VALUES(@EmployeeID, @BranchID, @UserID);`,
};
