import express from "express";
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';


import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/dbConnect.js'
import verifyJWT from './middleware/verifyJWT.js';
import authRoutes from './routes/auth/auth.js';
import recordsRoutes from './routes/records/records.js';
import usersRoutes from './routes/users/users.js';


const app = express();

const PORT = process.env.PORT || 3500;


// Connect to DB
connectDB();


// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/auth', authRoutes);

app.use(verifyJWT);
app.use('/records', recordsRoutes);
app.use('/users', usersRoutes);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})