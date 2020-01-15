import mongoose from 'mongoose';
import {hash} from 'bcryptjs';
 
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

UserSchema.pre('save', function(next) {
    const schema = this;

    hash(schema.Password, 20, (err, hash) => {
        if (err) {console.log(err)}

        schema.Password = hash;

        next();
    })
})

export default mongoose.model('User', UserSchema);