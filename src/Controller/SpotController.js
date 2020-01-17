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

            const {idToken, price, techs, company} = req.body;
            const {filename} = req.file;

            parseFloat(price).toFixed(2);
            techs.split(",").map(techs => techs.trim());

            const spotCreated = await SpotModel.create({
                user : idToken,
                price,
                techs,
                company, 
                thumbnail: filename
            });

            return res.status(200).json({message: "Spot registered", spotCreated});
        } catch (error) {
            return res.status(400).json({error});
        }
    }
};