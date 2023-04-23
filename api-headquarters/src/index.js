import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import routes from "./routes";
import { MESSAGES } from "./utils/messages";
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(routes);

app.use((req, res) => res.status(404).json({ message: MESSAGES.NOT_FOUND }));

app.listen(port, "0.0.0.0", () => {
  console.log(`Server app listening at http://localhost:${port}`);
});
