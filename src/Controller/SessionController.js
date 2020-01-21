import "module-alias/register";
import SpotModel from "@Model/Spot";
import UserModel from "@Model/User";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

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

        	return res.status(200).json({message: "Registered", user: userCreated});
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

			userDb.Password = undefined;

			return res.status(200).json({message: "Login successfull", user: userDb});
		} catch (error) {
			return res.send(error);
		}
	},
	async destroy(req, res) {
		try {
			const {idToken} = req;

			const spotDb = await SpotModel.find({
				user: idToken
			});

			if (spotDb) {
				await SpotModel.deleteMany({
					user: idToken
				});

				const userDeleted = await UserModel.deleteOne({_id: idToken}, {new: true});

				return res.status(200).json({message: "User deleted", user: userDeleted});
			}
			else {
				const userDeleted = await UserModel.deleteOne({_id: idToken}, {new: true});

				return res.status(200).json({message: "User deleted", user: userDeleted});
			}
			
		} catch (error) {
			return res.status(400).json({error});
		}
	},
	async update(req, res) {
		try {
			const {idToken} = req;
			const {Password, Email} = req.body;

			const userDb = await UserModel.findById({
				_id: idToken
			}).select("+Password");

			if (await bcrypt.compare(Password, userDb.Password)) {
				return res.status(400).json({message: "Equal passowords"});
			}
			else if (userDb.Email == Email) {
				return res.status(400).json({message: "Equal email"});
			}

			const userAltered = await UserModel.findOneAndUpdate({
				_id: idToken
			}, {
				Password,
				Email
			}, {
				new: true
			}).select("+Password");

			const token = await generateToken({id: userAltered.id});

			res.setHeader("Authorization", `Bearer ${token}`);

			return res.status(200).json({message: "Update successfull", UserUpdated: userAltered});
		} catch (error) {
			return res.status(400).json({error});
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