import User from '../../model/User.js';
import jwt from 'jsonwebtoken';

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || user.name !== decoded.name) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {
                    "username": user.name
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '10s' }
            );
            res.json(accessToken)
        }
    );
}

export default handleRefreshToken;