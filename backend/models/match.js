import mongoose from "mongoose";

const MatchSchema = mongoose.Schema({
    donation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Donation',
        required: true
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed'],
        default: 'pending'
    }
})

const Match = mongoose.model('Match', MatchSchema);

export default Match;