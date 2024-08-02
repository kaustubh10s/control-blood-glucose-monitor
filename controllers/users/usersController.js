import User from "../../model/User.js";

export const getUser = async (req, res) => {
    if (!req?.params?.user_id) return res.status(400).json({ 'error': 'user id required' });

    const user_id = req.params.user_id;
    const user = await User.findOne({ _id: user_id }).exec();
    if (!user) {
        return res.status(204).json({ 'error': 'No user found for the given user_id' });
    }
    res.json(user);
}

