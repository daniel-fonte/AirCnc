import "module-alias/register";
import express from "express";
import SessionUser from "@Controller/SessionUser";
import SpotController from "@Controller/SpotController";
import TokenVerify from "@Middleware/token";
import multer from "multer";
import storage from "@Config/upload";

const upload = multer(storage);

const routes = express.Router();

//User
routes.post("/Register", SessionUser.store);

routes.post("/Login", SessionUser.show);

//Spot
routes.post("/Spot/Register", TokenVerify);

routes.post("/Spot/Register", upload.single("thumbnail"), SpotController.store);

export default routes;