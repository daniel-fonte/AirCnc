import "module-alias/register";
import SpotModel from "@Model/Spot";

export default {
    async store(req, res) {
        try {
            if(!req.body.price) {
                return res.status(400).json({error: "Price not insert"});
            }
            if(!req.body.company) {
                return res.status(400).json({error: "Company not insert"});
            }
            
            if(!req.body.techs) {
                return res.status(400).json({error: "Techs not insert"});
            }
            
            const {idToken} = req;
            const {price, techs, company} = req.body;
            const {filename} = req.file;

            parseFloat(price).toFixed(2);
            techs.split(",").map(techs => techs.trim());

            const spotCreated = await SpotModel.create({
                user : idToken,
                price,
                techs,
                company, 
                thumbnail: filename,
                url: ""
            });

            return res.status(200).json({message: "Spot registered", spotCreated});
        } catch (error) {
            return res.status(400).json({error});
        }
    },
    async index(req, res) {
        try {
            const {idToken} = req;
            
            const spotDb = await SpotModel.find({
                user: idToken
            });

            if (spotDb == "") {
                return res.status(400).json({message: "Spots empty"});
            }
            
            return res.status(200).json({spots: spotDb});
        }
        catch(error) {
            return res.status(400).json({error});
        }
    },
    async destroy(req, res) {
        try {
            const {idSpot} = req.params;

            const spotDeleted = await SpotModel.deleteOne({
                _id: idSpot
            });
            
            return res.status(200).json({message: "Spot deleted", spotDeleted});
        } catch (error) {
            return res.status(400).json({error});
        }
    },
    async update(req, res) {
        try {
            const {price, techs, company} = req.body;
            const {idSpot} = req.params;

            techs.split(",").map(techs => techs.trim());
            parseFloat(price).toFixed(2);

            const SpotAltered = await SpotModel.findByIdAndUpdate({
                _id: idSpot
            }, {
                price,
                techs, 
                company
            });

            return res.status(200).json({message: "Update Sucessfull", SpotAltered});
        } catch (error) {
            return res.status(400).json({error});
        }
    }
};