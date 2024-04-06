import mongoose from "mongoose";


const streamSchema = new mongoose.Schema({
    streamKey:{
        type:String,
        required:true
    },
    audioBitsPerSecond:{
        type:String,
        required:true
    },
    videoBitsPerSecond:{
        type:String,
        required:true,
        unique:true
    },
    framerate:{
        type:String,
        required:true
    },
    
},{timestamps:true});

const Stream = mongoose.model("Stream",streamSchema);
export default Stream;