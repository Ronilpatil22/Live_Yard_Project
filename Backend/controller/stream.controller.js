import Stream from '../model/stream.model.js';
import bcrypt from 'bcryptjs';

export const addStream = async(req,res)=>{
        try{
            const {streamKey,audioBitsPerSecond,videoBitsPerSecond,framerate} = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedStream = await bcrypt.hash(streamKey,salt);
            const newstream = new Stream({
                streamKey:hashedStream,
                audioBitsPerSecond,
                videoBitsPerSecond,
                framerate
            })
            console.log(newstream)
            if(newstream){
                await newstream.save();
                console.log(newstream)
                res.status(201).json({
                    _id:newstream._id,
                    streamKey:newstream.streamKey,
                    audioBitsPerSecond:newstream.audioBitsPerSecond,
                    videoBitsPerSecond:newstream.videoBitsPerSecond,
                    framerate:newstream.framerate
                })
            }else{
                res.status(401).json({error:"Record not inserted"})
            }
        }catch(error){
            console.log(error)
            res.status(500).json({error:"Internal Server error"});
        }
}