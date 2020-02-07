import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config({path: "./src/Config/.env"});

const SpotSchema = new mongoose.Schema({
    thumbnail: {
        type: String,
        required: true
    },
    price: Number,
    techs: [String],
    company: String, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    url: String
});

SpotSchema.pre("save", function(next) {
    if (!this.url) {
        this.url = `${process.env.SERVER_HTTP}/file/${this.thumbnail}`;

        next();
    }
    else {
        next();
    }
});

export default mongoose.model("Spot", SpotSchema);