import "module-alias/register";
import express from "express";
import SessionUser from "@Controller/SessionUser";
import SpotController from "@Controller/SpotController";
import TokenVerify from "@Middleware/token";
import multer from "multer";
import storage from "@Config/upload";

const upload = multer(storage);

const routes = express.Router();

//Spot Dashboards
routes.post("/Dashboard/Register", SessionUser.store);

routes.post("/Dashboard/Login", SessionUser.show);

routes.post("/Spot/Dashboard", TokenVerify);
routes.post("/Spot/Dashboard", upload.single("thumbnail"), SpotController.store);

routes.get("/Spot/Dashboard", TokenVerify);
routes.get("/Spot/Dashboard", SpotController.index);

routes.delete("/Spot/Dashboard/:idSpot", TokenVerify);
routes.delete("/Spot/Dashboard/:idSpot", SpotController.destroy);

routes.put("/Spot/Dashboard/:idSpot", TokenVerify);
routes.put("/Spot/Dashboard/:idSpot", SpotController.update);

export default routes;