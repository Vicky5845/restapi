import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import roleRoute from './routes/role.js'
import authRoute from './routes/auth.js'

dotenv.config();

const app = express();

app.use(express.json());
app.use('/api/role',roleRoute)
app.use('/api/auth',authRoute)


const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Databse connected");
    } catch (error) {
        throw error;
    }
}

app.listen(process.env.port,()=>{
    connectDB()
  
    console.log("Connected to Server ");
})