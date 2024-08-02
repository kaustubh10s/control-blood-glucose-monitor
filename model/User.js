import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        unique: true,
        match: [/.+@.+\..+/, 'Email syntax error: Enter a valid email address']
    },
    password: {
        type: String,
        required: true
    },
    metadata: {
        type: Schema.Types.Mixed,
        required: false
    },
    refreshToken: {
        type: String
    }
});

export default mongoose.model('User', userSchema);