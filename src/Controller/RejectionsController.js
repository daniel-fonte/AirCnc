import "module-alias/register";
import BookingModel from "@Model/Booking";

export default {
    async store(req, res) {
        try {
            const {io, connectedUsers} = req;
            const {booking_id} = req.params;

            const booking = await BookingModel.findById(booking_id).populate("spot");

            booking.Approved = false;

            await booking.save();

            const ownerSocket = connectedUsers[booking.user._id];
            
            if (ownerSocket) {
                io.to(ownerSocket).emit("bookingResponse", {response: booking.Approved, booking});
            }

            return res.status(200).json({BookingResponse: booking});
        } catch (error) {
            return res.status(400).json({error});
        }
    }
};