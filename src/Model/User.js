import bcrypt from "bcryptjs";
import mongoose from "mongoose";
 
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

UserSchema.pre("save", async function(next) {
    try {
        const schema = this;

        const hashPassoword = await bcrypt.hash(schema.Password, 10);

        schema.Password = hashPassoword;

        next();
    } catch (error) {
        return error;
    }
});

UserSchema.pre("findOneAndUpdate", async function(next) {
    try {
        const schema = this;
        const update = schema.getUpdate();

        const hasPassword = await bcrypt.hash(update.Password, 10);

        update.Password = hasPassword;

        next();
    } catch (error) {
        return error;
    }
});

export default mongoose.model("User", UserSchema);