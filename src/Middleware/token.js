import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config({path: "./src/Config/.env"});

export default async (req, res, next) => {
    try {
        if (!req.header("Authorization")) {
            return res.status(400).json({error: "Token required"});
        }

        const tokenHeader = req.header("Authorization");

        const parts = tokenHeader.split(" ");

        if (parts[0] != "Bearer" | parts.length != 2) {
            return res.status(400).json({error: "Token malformed"});
        }

        const {id} = await jwt.verify(parts[1], process.env.PRIVATE_KEY);

        req.idToken = id;

        return next();
    } catch (error) {
        return res.status(400).json({error});
    }
};