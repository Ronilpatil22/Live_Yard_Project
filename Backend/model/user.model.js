import mongoose from "mongoose";


const signUpSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    confirmPassword:{
        type:String,
        minlength:6
    },
    email:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
},{timestamps:true});

const UserSignUp = mongoose.model("SignUp",signUpSchema);
export default UserSignUp;