import Record from "../../model/Record.js";
import jwt from "jsonwebtoken";

export const getRecords = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return res.sendStatus(401);

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user_id = decoded.user_id;

        const records = await Record.find({ user_id: user_id}).exec();
        res.json(records);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
}

export const createRecord = async (req, res) => {
    try {
        const { user_id, blood_glucose, unit } = req.body;
        if (!user_id || !blood_glucose || !unit) return res.status(400).json({'error': 'user_id, blood_glucose or unit missing!'});
    
        const newRecord = await Record.create({
            user_id,
            blood_glucose,
            unit
        });
    
        res.status(201).json(newRecord);
    } catch (err) {
        if (err.name == 'ValidationError') return res.status(400).json({ 'error': err.message});
        res.status(500).json({'error': err.message});
    }
    
}

