import "module-alias/register";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "@Routes";
import {resolve} from "path";

const app = express();

dotenv.config({path: "./src/Config/.env"});

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/file",  express.static(resolve(__dirname, "..", "Uploads", "Spots")));
app.use(routes);

app.listen(3000);