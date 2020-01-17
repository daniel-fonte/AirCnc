import mongoose from "mongoose";

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    price: Number,
    techs: [String],
    company: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

export default mongoose.model("Spot", SpotSchema);