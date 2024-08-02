import User from '../../model/User.js';
import bcrypt from 'bcrypt';

const handleRegister = async (req, res) => {
    const { email, name, pwd } = req.body;
    if (!email || !pwd || !name) return res.status(400).json({ 'message': 'name, email and pwd are required' });

    const duplicate = await User.findOne({ email: email }).exec();
    if (duplicate) return res.sendStatus(409);

    try {
        const hashedPassword = await bcrypt.hash(pwd, 10);
        const newUser = await User.create({
            email,
            name,
            "password": hashedPassword
        });
        res.status(201).json({ 'success': 'New user created!' });
    } catch (err) {
        res.status(500).json({ 'error': err.message });
    }
}

export default handleRegister;