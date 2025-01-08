import jwt from 'jsonwebtoken'

export const generateToken = (id,res) => {
    const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
    // console.log("generated token", token);
    const cookieOptions = {
        expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        // httpOnly: true, 
        sameSite: "None",
        secure: true,  
    };
    res.cookie("token", token, cookieOptions);
    return token;
};
