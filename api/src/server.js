import express from "express";
import initAPIRoute from "./route/api";
import connection from "./configs/connectDB";

require("dotenv").config();
var morgan = require("morgan");

const app = express();
const port = process.env.PORT || 4000;

app.use(morgan("combined"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// init api route
initAPIRoute(app);

//handle 404 not found
app.use((req, res) => {
  return res.status(404).json({ message: "Not found" });
});

app.listen(port, () => {
  console.log(`Server app listening at http://localhost:${port}`);
});
