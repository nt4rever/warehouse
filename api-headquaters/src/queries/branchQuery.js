export const BRANCH_QUERY = {
  BY_ID: `SELECT * FROM Branch WHERE BranchID = @BranchID;`,
  ALL: `SELECT * FROM Branch;`,
  CREATE: `INSERT INTO Branch VALUES(@BranchID, @BranchName, @Address, @PhoneNumber);`,
  UPDATE: `UPDATE Branch SET BranchName = @BranchName, Address = @Address, PhoneNumber = @PhoneNumber WHERE BranchID = @BranchID;`,
  DELTE: `DELETE FROM Branch WHERE BranchID = @BranchID;`,
};
