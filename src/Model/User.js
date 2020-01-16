import mongoose from "mongoose";
import bcrypt from "bcryptjs";
 
const UserSchema = new mongoose.Schema({
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        min: 6,
        required: true,
        select: false
    },
    createAt: {
        type: Date,
        required: true
    }
});

UserSchema.pre("save", function(next) {
    const cryptPassword = async () => {
        try {
            const crypt = await bcrypt.hash(this.Password, 10);

            return crypt;
        }
        catch(error) {
            return error;
        }
    };
    cryptPassword().then(crypt => {
        this.Password = crypt;

        next();
    });
});

export default mongoose.model("User", UserSchema);