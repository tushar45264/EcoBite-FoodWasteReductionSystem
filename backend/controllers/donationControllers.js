import Donation from "../models/donation.js";

export const CreateDonation=async(req,res)=>{
    const { donor, foodType, quantity, expirationDate, pickupLocation, status } = req.body;
    try {
        if (!donor.location || !donor.location.coordinates.length) {
            return res.status(400).json({ success: false, error: 'Donor location not set' });
        }
        const donation = await Donation.create({
            donor: req.user._id,
            foodType,
            quantity,
            expirationDate,
            pickupLocation,
            donorLocation: donor.location,
            status
        });
        res.status(201).json({ success: true, data: donation });
    } catch(err){
        res.status(400).json({ success: false, error: err.message });
    }
}

export const GetDonation =async(req,res)=>{
    try {
        const donation = await Donation.find({status:'available'});
        res.status(200).json({ success: true, data: donation });
    } catch(err){
        res.status(400).json({ success: false, error: err.message });
    }
}