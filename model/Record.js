import mongoose from "mongoose";
const Schema = mongoose.Schema;

const recordSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    blood_glucose: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true,
        enum: ['mmol/L', 'mg/dL']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    metadata: {
        type: Schema.Types.Mixed,
        required: false
    }
});

export default mongoose.model('Record', recordSchema);