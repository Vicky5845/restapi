import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/role', roleRoute)
app.use('/api/auth', authRoute)

app.use((obj, req, res, next) => {
    const statusCode = obj.status || 500;
    const message = obj.message || "Something Went Wrong"
    return res.status(statusCode).json({
        sucess: [200, 201, 204].some(a => a === obj.status) ? true : false,
        status:statusCode,
        message:message,
        data:obj.data
    })
})

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database connected");
    } catch (error) {
        throw error;
    }
}

app.listen(process.env.port, () => {
    connectDB();
    console.log("Server Connected");
})