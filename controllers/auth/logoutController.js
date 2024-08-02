import User from '../../model/User.js';

const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(204); //No content
    const refreshToken = cookies.jwt;

    const user = await User.findOne({ refreshToken }).exec();
    if (!user) {
        res.clearCookie('jwt', { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 });
        return res.sendStatus(204);
    }

    user.refreshToken = '';
    const result = await user.save();

    res.clearCookie('jwt', { httpOnly: true, secure: true, maxAge: 24 * 60 * 60 * 1000 }); // delete cookie on browser
    res.sendStatus(204);
}

export default handleLogout;