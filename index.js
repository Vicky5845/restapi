import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import { SucessAndErrorHandler } from './utilis/hander.js';


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use('/api/role',roleRoute)
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use(SucessAndErrorHandler)

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected");
    } catch (error) {
        throw error
    }
}

app.listen(process.env.port, () => {
    connectDB()
    console.log("Server Connected");
})