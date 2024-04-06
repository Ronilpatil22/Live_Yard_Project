import Stream from '../model/stream.model.js';
import bcrypt from 'bcryptjs';

export const addStream = async(req,res)=>{
        try{
            const {streamKey,audioBitsPerSecond,videoBitsPerSecond,framerate} = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedStream = await bcrypt.hash(streamKey,salt);
            const stream = new Stream({
                streamKey:hashedStream,
                audioBitsPerSecond,
                videoBitsPerSecond,
                framerate
            })
            if(stream){
                await stream.save();
                res.status(201).json({
                    _id:stream._id,
                    streamKey:stream.streamKey,
                    audioBitsPerSecond:stream.audioBitsPerSecond,
                    videoBitsPerSecond:stream.videoBitsPerSecond,
                    framerate:stream.framerate
                })
            }else{
                res.status(401).json({error:"Record not inserted"})
            }
        }catch(error){
            res.status(500).json({error:"Internal Server error"});
        }
}