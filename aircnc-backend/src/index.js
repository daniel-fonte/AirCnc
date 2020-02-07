import "module-alias/register";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import {resolve} from "path";
import socket from "socket.io";
import socketioJwt from "socketio-jwt";

import corsOptions from "@Config/cors";
import routes from "@Routes";

dotenv.config({path: "./src/Config/.env"});

const app = express();

const server = http.Server(app);

const io = socket(server);

mongoose.connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {};

io.use(socketioJwt.authorize({
    secret: process.env.PRIVATE_KEY,
    handshake: true
}));

io.on("connection", (socket) => {
    socket.emit("authenticate", socket.decoded_token.id);
    
    const user_id = socket.decoded_token.id;
    connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
    req.io = io;
    req.connectedUsers = connectedUsers;

    return next();
});

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/file",  express.static(resolve(__dirname, "..", "Uploads", "Spots")));
app.use(cors(corsOptions));
app.use(routes);

server.listen(3333);