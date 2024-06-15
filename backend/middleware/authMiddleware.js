import jwt from "jsonwebtoken";
import User from "../models/user.js";

const authMiddleware = async(req, res, next) => {

    const {token} = req.cookies;
    console.log(req.cookies);
    if(!token){
        return res.status(401).json({error: "Unauthorized"});
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select("-password");
        if(!user) {
            res.status(404).json({message: "User not found"});
        }
        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({error: "Unauthorized"});
    }
};

export default authMiddleware;