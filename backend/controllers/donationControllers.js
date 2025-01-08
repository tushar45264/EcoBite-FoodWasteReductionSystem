import Donation from "../models/donation.js";
import User from "../models/user.js";


export const CreateDonation = async (req, res) => {
    const { foodType, quantity, expirationDate, pickupLocation, status,image} = req.body;
    const id = req.params.id;
    const donor=await User.findById(id);
    try {
        const donationData = {
            donor: donor._id,
            foodType,
            quantity,
            expirationDate,
            pickupLocation,
            donorLocation: donor.location,
            status,
            image
        };


        const donation = await Donation.create(donationData);

        res.status(201).json({ success: true, data: donation });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

export const GetUserByDonationId = async(req,res)=>{
    const {id}=req.params;
    try{
        const donation=await User.findById(id);
        res.status(200).json({success:true,data:donation});
    }catch(err){
        res.status(400).json({success:false,error:err.message});
    }
}

export const GetDonation = async (req, res) => {
    try {
        const donations = await Donation.find({ });
        res.status(200).json({ success: true, data: donations });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

export const UpdateDonation = async (req, res) => {
    const { id } = req.params;
    const { foodType, quantity, expirationDate, pickupLocation, status, image } = req.body;
    try {
        const donation = await Donation.findById(id);

        if (!donation) {
            return res.status(404).json({ success: false, error: 'Donation not found' });
        }

        // if (donation.donor.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ success: false, error: 'Unauthorized to update this donation' });
        // }

        donation.foodType = foodType || donation.foodType;
        donation.quantity = quantity || donation.quantity;
        donation.expirationDate = expirationDate || donation.expirationDate;
        donation.pickupLocation = pickupLocation || donation.pickupLocation;
        donation.status = status || donation.status;
        if (image) {
            donation.image = image;
        }
        console.log(donation)

        await donation.save();

        res.status(200).json({ success: true, data: donation });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

export const DeleteDonation = async (req, res) => {
    const { id } = req.params;
    // console.log(id)

    try {
        const donation = await Donation.findById(id);
        

        if (!donation) {
            return res.status(404).json({ success: false, error: 'Donation not found' });
        }
        console.log(donation)
        // if (donation.donor.toString() !== req.user._id.toString()) {
        //     return res.status(403).json({ success: false, error: 'Unauthorized to delete this donation' });
        // }

        await donation.remove();

        res.status(200).json({ success: true, data: 'Donation deleted' });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};


export const GetDonationById = async(req,res)=>{
    const {id}=req.params;
    // console.log(id)
    try{
        const donation=await Donation.find({donor:id});
        res.status(200).json({success:true,data:donation});
    }catch(err){
        res.status(400).json({success:false,error:err.message});
    }
}


