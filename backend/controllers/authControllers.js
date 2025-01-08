import User from '../models/user.js';
import { generateToken } from '../utils/jwt.js';

export const Register = async (req, res) => {
    const { name, email, password, role, location } = req.body;
    try {
        const user = await User.create({
            name,
            email,
            password,
            role,
            location: {
                type: 'Point',
                coordinates: location.coordinates
            }
        });
        const token = generateToken(user._id, res);
        return res.status(201).json({ success: true, data: { user, token } });
    } catch (err) {
        if (err.code === 11000) {
          return  res.status(400).json({ success: false, error: "Email already exists" });
        } else {
           return res.status(400).json({ success: false, error: err.message });
        }
    }
};

export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            const token = generateToken(user._id,res);
            // console.log(token)
          return  res.status(200).json({ success: true, data: { user, token } });
        } else {
          return  res.status(400).json({ success: false, error: "Invalid credentials" });
        }
    } catch (err) {
        console.log(err)
       return res.status(500).json({ success: false, error: err.message });
    }
};

export const Logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.status(200).json({ message: "Logged Out" });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Server Error" });
    }
};
