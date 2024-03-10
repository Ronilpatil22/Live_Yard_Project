import UserSignUp from "../model/user.model.js";
import bcrypt from 'bcryptjs';

export const login = async(req,res)=>{
    try{

  
            const {username,password} = req.body;
            const user = await UserSignUp.findOne({username});
            const isCorrectPassword = await bcrypt.compare(password,user?.password || "");

            if(!user || !isCorrectPassword){
                return res.status(400).json({error:"Invalid Username or Password"});
            }

            res.status(200).json({
                _id:user._id,
                    fullName:user.fullName,
                    password:user.password,
                    email:user.email,
                    gender:user.gender
            })
        }catch(error){
             res.status(500).json({error:"Internal Server Error"});
        }
}

export const signup = async(req,res)=>{
        try{
            const {fullName,username,password,confirmPassword,email,gender} = req.body;
            if(password!=confirmPassword){
               return res.status(400).json({error:"Password and ConfirmPassword do not match"});

            }
            const signup = await UserSignUp.findOne({username});
            if(signup){
                return res.status(400).json({error:"Username already exists"});
            }

            // const salt = await bcrypt.genSalt(50);
            // const hashedPassword = await bcrypt.hash(password,salt);

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password,salt);
            const newSignup = new UserSignUp({
                fullName,
                username,
                password:hashedPassword,
                confirmPassword,
                email,
                gender
            })
            if(newSignup){
                await newSignup.save();
                res.status(201).json({
                    _id:newSignup._id,
                    fullName:newSignup.fullName,
                    password:newSignup.password,
                    email:newSignup.email,
                    gender:newSignup.gender
                })
            }else{
                res.status(401).json({error:"User already exists"})
            }
        }catch(error){
            res.status(500).json({error:"Internal server error"})
        }
}