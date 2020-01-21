import "module-alias/register";
import SpotModel from "@Model/Spot";

export default {
    async index(req, res) {
        try {
            const {idToken} = req;

            const spotDb = await SpotModel.find({
                user: idToken
            });

            return res.status(200).json({Spots: spotDb});
        } catch (error) {
            return res.status(400).json({error});
        }
    },
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

            const spotCreated = await SpotModel.create({
                user : idToken,
                price:  parseFloat(price).toFixed(2),
                techs: techs.split(",").map(techs => techs.trim().toUpperCase()),
                company, 
                thumbnail: filename,
                url: ""
            });

            return res.status(200).json({message: "Spot registered", Spot: spotCreated});
        } catch (error) {
            return res.status(400).json({error});
        }
    },
    async destroy(req, res) {
        try {
            const {idSpot} = req.params;

            const spotDeleted = await SpotModel.deleteOne({
                _id: idSpot
            });
            
            return res.status(200).json({message: "Spot deleted", Spot: spotDeleted});
        } catch (error) {
            return res.status(400).json({error});
        }
    },
    async update(req, res) {
        try {  
            const {price, techs, company} = req.body;
            const {idSpot} = req.params;

            const SpotAltered = await SpotModel.findOneAndUpdate({
                _id: idSpot
            }, {
                price: parseFloat(price).toFixed(2),
                techs: techs.split(",").map(techs => techs.trim().toUpperCase()), 
                company
            }, {
                new: true
            });

            return res.status(200).json({message: "Update Sucessfull", Spot: SpotAltered});
            
        } catch (error) {
            return res.status(400).json({error});
        }
    }
};