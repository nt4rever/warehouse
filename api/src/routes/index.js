import express from "express";
import keys from "../configs/keys";
import apiRoutes from "./apis";

const router = express.Router();
const { apiURL } = keys.app;
const api = `/${apiURL}`;

// api routes
router.use(api, apiRoutes);

export default router;
