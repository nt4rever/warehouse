import { AUTH_MESSAGES, MESSAGES } from "../utils/messages";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    return res.status(200).json({ email, password });
  } catch (error) {
    return res.status(400).json({
      error: MESSAGES.ERROR,
    });
  }
};

export default { login };
