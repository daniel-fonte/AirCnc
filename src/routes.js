import "module-alias/register";
import storage from "@Config/upload";
import DashboardController from "@Controller/DashboardController";
import SessionUser from "@Controller/SessionController";
import SpotController from "@Controller/SpotController";
import TokenVerify from "@Middleware/token";
import express from "express";
import multer from "multer";

const upload = multer(storage);

const routes = express.Router();

//Public
routes.get("/Spots", SpotController.index);

routes.get("/Spots/Search", SpotController.show);

//SessionUser
routes.post("/Register", SessionUser.store);

routes.post("/Login", SessionUser.show);

routes.delete("/User/Settings", TokenVerify);
routes.delete("/User/Settings", SessionUser.destroy);

routes.put("/User/Settings", TokenVerify);
routes.put("/User/Settings", SessionUser.update);

//Dashboard
routes.post("/Spot/Dashboard", TokenVerify);
routes.post("/Spot/Dashboard", upload.single("thumbnail"), DashboardController.store);

routes.get("/Spot/Dashboard", TokenVerify);
routes.get("/Spot/Dashboard", DashboardController.index);

routes.delete("/Spot/Dashboard/:idSpot", TokenVerify);
routes.delete("/Spot/Dashboard/:idSpot", DashboardController.destroy);

routes.put("/Spot/Dashboard/:idSpot", TokenVerify);
routes.put("/Spot/Dashboard/:idSpot", DashboardController.update);

export default routes;