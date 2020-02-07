import "module-alias/register";
import express from "express";
import multer from "multer";

import storage from "@Config/upload";
import ApprovalController from "@Controller/ApprovalsController";
import BookingController from "@Controller/BookingController";
import DashboardController from "@Controller/DashboardController";
import RejectionController from "@Controller/RejectionsController";
import SessionUser from "@Controller/SessionController";
import SpotController from "@Controller/SpotController";
import TokenVerify from "@Middleware/token";

const upload = multer(storage);

const routes = express.Router();

//Booking
routes.post("/Booking/:idSpot", TokenVerify);
routes.post("/Booking/:idSpot", BookingController.store);

routes.post("/Booking/:booking_id/approval", TokenVerify);
routes.post("/Booking/:booking_id/approval", ApprovalController.store);

routes.post("/Booking/:booking_id/rejection", TokenVerify);
routes.post("/Booking/:booking_id/rejection", RejectionController.store);

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

routes.get("/Spot/Dashboard/:idSpot", TokenVerify);
routes.get("/Spot/Dashboard/:idSpot", DashboardController.show);

routes.delete("/Spot/Dashboard/:idSpot", TokenVerify);
routes.delete("/Spot/Dashboard/:idSpot", DashboardController.destroy);

routes.put("/Spot/Dashboard/:idSpot", TokenVerify);
routes.put("/Spot/Dashboard/:idSpot", DashboardController.update);

export default routes;