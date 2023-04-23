import * as dotenv from "dotenv";
import poolPromise from "./configs/connectDB";
dotenv.config();
import * as argon from "argon2";

async function seedDB() {
  const pool = await poolPromise;
  // clear database
  await pool
    .request()
    .query(
      `DELETE FROM Branch; DELETE FROM Role; DELETE FROM UserRole; DELETE FROM [QLVT_TQT].[dbo].[User];`
    );

  // insert base roles
  const roles = [
    { id: "ADMIN", name: "Quản trị viên" },
    { id: "EMPLOYEE", name: "Nhân viên" },
  ];
  for (const role of roles)
    await pool
      .request()
      .input("id", role.id)
      .input("name", role.name)
      .query(`INSERT INTO Role (RoleID,RoleName) VALUES(@id,@name)`);

  // insert branches
  const branches = [
    {
      id: "CN1",
      name: "Hà Nội",
      address: "Hà Nội",
    },
    {
      id: "CN2",
      name: "Huế",
      address: "Huế",
    },
    {
      id: "CN3",
      name: "Đà Nẵng",
      address: "Đà Nẵng",
    },
  ];
  for (const branch of branches)
    await pool
      .request()
      .input("id", branch.id)
      .input("name", branch.name)
      .input("address", branch.address)
      .query(
        `INSERT INTO Branch (BranchID,BranchName,Address) VALUES(@id,@name,@address)`
      );

  // create first admin user
  const user = {
    id: "ADMIN001",
    username: "admin001",
    password: "123456",
    firstName: "Admin",
    lastName: "TQT",
  };
  const hash = await argon.hash(user.password);
  await pool
    .request()
    .input("id", user.id)
    .input("username", user.username)
    .input("password", hash)
    .input("firstName", user.firstName)
    .input("lastName", user.lastName)
    .query(
      `INSERT INTO [QLVT_TQT].[dbo].[User]
        (UserID, UserName, Password, FirstName, LastName)
        VALUES (@id, @username, @password, @firstName, @lastName)`
    );

  // attach admin role for base user
  await pool
    .request()
    .input("id", user.id)
    .input("roleId", "ADMIN")
    .query(`INSERT INTO UserRole values(@id, @roleId)`);
}

seedDB()
  .then(() => console.log("Seed DB successfully =))"))
  .catch((error) => console.log(error));
