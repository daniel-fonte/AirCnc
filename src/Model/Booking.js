import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    Aproved: Boolean,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    spot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Spot"
    },
    Date: {
        required: true,
        type: String
    }
});

export default mongoose.model("Booking", BookingSchema);