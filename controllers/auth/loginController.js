import User from '../../model/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const handleLogin = async (req, res) => {
    const { email, pwd } = req.body;
    if (!email || !pwd) return res.status(400).json({ 'error': 'email and password required' });

    const user = await User.findOne({ email }).exec();
    if (!user) return res.sendStatus(401);

    const match = await bcrypt.compare(pwd, user.password);
    if (match) {
        const accessToken = jwt.sign(
            { "user_id": user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '5min' }
        );
        const refreshToken = jwt.sign(
            { "user_id": user._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );
        user.refreshToken = refreshToken;
        const result = await user.save();

        // save refreshToken in http only cookie
        res.cookie('jwt', refreshToken, { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 })
        res.json(accessToken);
    } else {
        res.sendStatus(401);
    }
}

export default handleLogin;