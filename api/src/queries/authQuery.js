export const AUTH_QUERY = {
  LOGIN: `select Users.UserID, Users.UserName, Users.Password, Users.FirstName, Users.LastName, Users.Gender, Users.Email, Users.Address, Users.PhoneNumber,
  Users.Birthday, Role.RoleID, Role.RoleName
  from [QLVT_TQT].[dbo].[User] as Users  join UserRole on Users.UserID = UserRole.UserID join Role on Role.RoleID = UserRole.RoleID 
  where Users.UserName = @username`,
};
