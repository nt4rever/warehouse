export const USER_QUERY = {
  ALL: `select Users.UserID, Users.UserName, Users.FirstName, Users.LastName, Users.Gender, Users.Email, Users.Address, Users.PhoneNumber,
  Users.Birthday, Role.RoleID, Role.RoleName
  from [QLVT_TQT].[dbo].[User] as Users 
  join UserRole on Users.UserID = UserRole.UserID 
  join Role on Role.RoleID = UserRole.RoleID`,
  GET_BY_ID: `select Users.UserID, Users.UserName, Users.Password, Users.FirstName, Users.LastName, Users.Gender, Users.Email, Users.Address, Users.PhoneNumber,
  Users.Birthday, Role.RoleID, Role.RoleName
  from [QLVT_TQT].[dbo].[User] as Users  join UserRole on Users.UserID = UserRole.UserID join Role on Role.RoleID = UserRole.RoleID 
  where Users.UserID = @Id OR Users.UserName = @Id`,
  CREATE: `INSERT INTO [QLVT_TQT].[dbo].[User]
  (UserID, UserName, Password, FirstName, LastName, Gender, Email, Address, PhoneNumber, Birthday)
  VALUES (@UserID, @UserName, @Password, @FirstName, @LastName, @Gender, @Email, @Address, @PhoneNumber, @Birthday);`,
  ATTACH_ROLE: `INSERT INTO UserRole values(@UserID, @RoleID)`,
  DELETE: `DELETE FROM [QLVT_TQT].[dbo].[User] WHERE UserID = @Id OR UserName = @Id`,
  UPDATE: `UPDATE [QLVT_TQT].[dbo].[User]
  SET Password = @Password, FirstName = @FirstName, LastName = @LastName, Gender = @Gender, Email = @Email, Address = @Address, PhoneNumber = @PhoneNumber, Birthday = @Birthday
  WHERE UserID = @UserID;`,
};
