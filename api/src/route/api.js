import express from "express";
import HomeController from "../controller/HomeController";
let router = express.Router();

const initAPIRoute = (app) => {
  router.get("/", HomeController.homePage);
  return app.use("/api/", router);
};

export default initAPIRoute;
