import "module-alias/register";
import BookingModel from "@Model/Booking";

export default {
    async store(req, res) {
        try {
            const {idToken, io, connectedUsers} = req;
            const {idSpot} = req.params;
            const {Date} = req.body;

            const bookingDb = await BookingModel.create({
                Date,
                user: idToken,
                spot: idSpot,
                Aproved: true
            });

            await bookingDb.populate("user").populate("spot").execPopulate();

            const ownerSocket = connectedUsers[bookingDb.spot.user];

            if(ownerSocket) {
                io.to(ownerSocket).emit("booking_request", bookingDb);
            }

            return res.status(200).json({message: "Booking registered", booking: bookingDb});
        } catch (error) {
            return res.status(400).json({error});
        }
    }
};