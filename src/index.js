import "module-alias/register";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import {resolve} from "path";

import corsOptions from "@Config/cors";
import routes from "@Routes";

const app = express();

dotenv.config({path: "./src/Config/.env"});

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/file",  express.static(resolve(__dirname, "..", "Uploads", "Spots")));
app.use(cors(corsOptions));
app.use(routes);

app.listen(3333);