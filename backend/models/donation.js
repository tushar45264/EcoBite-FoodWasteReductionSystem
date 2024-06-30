import mongoose from "mongoose";

const DonationSchema = new mongoose.Schema({
    donor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    foodType: {
        type: String,
        required: true
    },
    quantity: {
        type: String,
        required: true
    },
    expirationDate: {
        type: String,
        required: true
    },
    pickupLocation: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['available', 'claimed', 'picked_up'],
        default: 'available'
    },
    image: {
        type: String, 
        required: false  
    }
});

const Donation = mongoose.model('Donation', DonationSchema);

export default Donation;
