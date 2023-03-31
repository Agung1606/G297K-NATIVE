import mongoose from "mongoose";

export const connectDB = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.MONGO_URI as string, {
        autoIndex: false
    })
    console.log('connect to db success');
    
};