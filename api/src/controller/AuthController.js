import poolPromise from "../configs/connectDB";
import { AUTH_MESSAGES, MESSAGES } from "../utils/messages";

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const pool = await poolPromise;
    const result = await pool
      .request()
      .query("select * from [QLVT_TQT].[dbo].[User]");
    console.dir(result);
    return res.status(200).json({ username, password });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: MESSAGES.ERROR,
    });
  }
};

export default { login };
