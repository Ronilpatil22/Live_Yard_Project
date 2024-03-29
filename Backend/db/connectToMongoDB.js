import mongoose from 'mongoose';
// import process from 'express'
const connectToMongo  = async()=>{
    const url = process.env.MONGO_DB_URL;
    console.log(url)
    try{
        await mongoose.connect(url);
        console.log("connected to Mongodb");
    }catch(error){
        console.log("error connecting to Mongodb",error.message);
    }
}

export default connectToMongo;