import Match from "../models/match.js";
import Donation from "../models/donation.js";
import User from "../models/user.js";

export const createMatch = async(req,res)=>{
    const { donationId,donorId } = req.body;
        const userId = req.user._id;
        console.log('userId', userId);
        console.log('donationId', donationId);

        try {
            const user = await User.findById(userId);
            if (!user) {
                return res.status(404).json({ success: false, error: "User not found" });
            }

            const donation = await Donation.findById(donationId);
            if (!donation || donation.status !== 'available') {
                return res.status(400).json({ success: false, error: "Donation not available" });
            }

            if (user.role === 'donor') {
                return res.status(400).json({ success: false, error: "Donation only available for Recipients" });
            }

            donation.status = 'claimed';
            await donation.save();

            const match = await Match.create({
                donation: donationId,
                recipient: user._id,
                donor: donorId
            });

            res.status(200).json({ success: true, data: match });
        } catch (error) {
            res.status(400).json({ success: false, error: error.message });
        }
}

export const GetMatch = async(req,res)=>{
    try {
        const match=await Match.find({recipient: req.user._id});
        res.status(200).json({ success: true, data: match });
    } catch(error){
        res.status(400).json({ success: false, error: error.message });
    }
}

export const DeleteMatch = async (req, res) => {
    const { id } = req.params;
  
    try {
      const result = await Match.deleteMany({ donor: id });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ success: false, message: 'No matches found with the given donor ID' });
      }
      res.status(200).json({ success: true, message: `${result.deletedCount} matches deleted successfully` });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  };

  export const GetMatchByDonationId= async (req, res) => {
       const {id}=req.params;
       try{
            const response =await Match.find({donation:id});
            res.status(200).json({success:true,data:response});
       } catch(error){
           res.status(400).json({ success: false, error: error.message });
       }
  }