import Match from "../models/match.js";
import Donation from "../models/donation.js";

export const createMatch = async(req,res)=>{
    const { donationId }=req.body;
    try {
        console.log(req.user._id);
        const donation =await Donation.findById(donationId);
        if(!donation || donation.status !=='available') {
            return res.status(400).json({ success: false, error: "Donation not available" });
        } if(req.user._id.role==='donor'){
            return res.status(400).json({success:false,error:"Donation only available for Recepients"})
        } donation.status = 'claimed';
        await donation.save();
        console.log(req.user._id)
        const match = await Match.create({
            donation: donationId,
            recipient: req.user._id
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