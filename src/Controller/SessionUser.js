import "module-alias/register";
import dotenv from "dotenv";
import UserModel from "@Model/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

dotenv.config({path: "./src/Config/.env"});

export default {
    async store(req, res) {
    	try {
        	if (!req.body.Email) {
        		return res.status.status(400).json({error: "Email not insert"});
        	}
        	if (!req.body.Password) {
        		return res.status.status(400).json({error: "Password not insert"});
        	}

        	const {Email, Password} = req.body;

        	if (Password.length < 6) {
        		return res.status(400).json({error: "Password short"});
        	}

        	const userDb = await UserModel.findOne({
       			Email
        	});

        	if (userDb != null) {
        		return res.status(400).json({error: "User already exists"});
        	}

        	const userCreated = await UserModel.create({
        		Email,
        		Password,
        		createAt: new Date()
        	});

        	const token = await generateToken({
        		id: userCreated.id
        	});

        	res.setHeader("Authorization", `Bearer ${token}`);

            userCreated.Password = undefined;

        	return res.status(200).json({message: "Registered", userCreated});
        }
        catch(error) {
        	return res.status(400).json({error});
        }
    },
   	async show(req, res) {
		try {
			if (!req.body.Email) {
				return res.status(400).json({error: "Email not insert"});
			}
			if (!req.body.Password) {
				return res.status(400).json({error: "Password not insert"});
			}

			const {Email, Password} = req.body;

			const userDb = await UserModel.findOne({
				Email
			}).select("+Password");

			if (!userDb) {
				return res.status(400).json({error: "Email not exists"});
			}

			if (!await bcrypt.compare(Password, userDb.Password)) {
				return res.status(400).json({error: "Incorrect password"});
			}

			const token = await generateToken({
				id: userDb.id
			});

			res.setHeader("Authorization", `Bearer ${token}`);

			return res.status(200).json({message: "Login successfull"});
		} catch (error) {
			return res.send(error);
		}
    }
};

async function generateToken(params = {}) {
	try {
		const token = await jwt.sign(params, process.env.PRIVATE_KEY, {
			expiresIn: "4h"
		});

		return token;
	}
	catch(error) {
		return error;
	}
} 