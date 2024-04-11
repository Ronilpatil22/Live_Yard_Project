import mongoose from "mongoose";


const streamSchema = new mongoose.Schema({
    streamKey:{
        type:String
    },
    audioBitsPerSecond:{
        type:String
    },
    videoBitsPerSecond:{
        type:String
        
    },
    framerate:{
        type:String
    },
    
},{timestamps:true});

const Stream = mongoose.model("Stream",streamSchema);
export default Stream;