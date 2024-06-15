import express from 'express';
import User from '../models/user.js';
import Donation from '../models/donation.js';
import Match from '../models/match.js';

const router = express.Router();

const PROXIMITY_THRESHOLD = 0.001; // ~100 meters, adjust as needed

router.post('/location/update', async (req, res) => {
    const { coordinates } = req.body;

    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.status(404).json({ success: false, error: 'User not found' });
        }

        // Update recipient's location
        user.location = {
            type: 'Point',
            coordinates: coordinates
        };
        await user.save();

        // Find active matches for the recipient
        const match = await Match.findOne({ recipient: req.user._id, status: 'pending' }).populate('donation');
        if (!match) {
            return res.status(200).json({ success: true, data: { proximityReached: false } });
        }

        const donorLocation = match.donation.pickupLocation.coordinates;
        const recipientLocation = coordinates;

        // Check if recipient is within proximity of the donor
        const distance = calculateDistance(donorLocation, recipientLocation);
        if (distance <= PROXIMITY_THRESHOLD) {
            match.status = 'completed';
            await match.save();
            match.donation.status = 'picked_up';
            await match.donation.save();

            return res.status(200).json({ success: true, data: { proximityReached: true } });
        }

        res.status(200).json({ success: true, data: { proximityReached: false } });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

function calculateDistance([lon1, lat1], [lon2, lat2]) {
    const R = 6371; // Radius of the Earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    return R * c; // Distance in km
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

export default router;
