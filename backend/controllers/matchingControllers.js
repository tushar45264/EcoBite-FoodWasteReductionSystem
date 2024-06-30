import Match from "../models/match.js";
import Donation from "../models/donation.js";
import User from "../models/user.js";

export const createMatch = async(req,res)=>{
    const { donationId }=req.body;
    const userId=req.params.id;

    try {
        const us=await User.findById("6672ab7a7d3870a69a2d2f81");
        // console.log("user:",us._id)
        const donation =await Donation.findById(donationId);
        if(!donation || donation.status !=='available') {
            return res.status(400).json({ success: false, error: "Donation not available" });
        }  
        if(us.role==='donor'){
            return res.status(400).json({success:false,error:"Donation only available for Recepients"})
        } donation.status = 'claimed';
        await donation.save();
        console.log(us._id)
        const match = await Match.create({
            donation: donationId,
            recipient: us._id
        }) 
        res.status(200).json({ success: true,data: match });
    } catch(error){
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