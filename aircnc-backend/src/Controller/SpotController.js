import "module-alias/register";
import SpotModel from "@Model/Spot";

export default {
    async index(req, res) {
        try {
            const spotsDb = await SpotModel.find({}).populate("user");

            return res.status(200).json({Spots: spotsDb});
        }
        catch(error) {
            return res.status(400).json({error});
        }
    },
    async show(req, res) {
        try {
            const {techs} = req.query;

            const spotDb = await SpotModel.find({
                techs: {
                    $in: techs.split(",").map(techs => techs.trim().toUpperCase())
                }
            }).populate("user");

            if (spotDb == "") {
                return res.status(400).json({message: "Cannot find Spots"});
            }
            
            return res.json({Spots: spotDb});
        } catch (error) {
            return res.status(400).json({error});
        }
    }
};