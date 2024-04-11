import mongoose from "mongoose";


const streamSchema = new mongoose.Schema({
    streamKey:{
        type:String,
        unique:false
    },
    audioBitsPerSecond:{
        type:String,
        unique:false
    },
    videoBitsPerSecond:{
        type:String,
        unique:false
    },
    framerate:{
        type:String,
        unique:false
    },
    
},{timestamps:true});

const Stream = mongoose.model("Stream",streamSchema);
export default Stream;