

import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext';
const useSignup = ()=>{
    const {setAuthUser} = useAuthContext();
    const signup  = async({fullName,username,password,confirmPassword,email,gender})=>{
        const success = handleInputError({fullName,username,password,confirmPassword,email,gender});
        if(!success) return true;

        try{
            console.log(username,password);
            const res = await fetch('http://localhost:3000/api/signup',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({fullName,username,password,confirmPassword,email,gender})
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        }catch(error){
            console.log(error.message);
        }

    }

    return {signup};
}

export default useSignup;

function handleInputError({fullName,username,password,confirmPassword,email,gender}){
    if(!fullName || !username || !password || !confirmPassword || !email || !gender){
        console.error("Please fill in all the fields");
        return false;
  }

  if(password !== confirmPassword){
    console.error("Passwords do not match");
        return false;
  }
  if(password.length < 6){
    console.error("Password must have atleast 6 character");
        return false;
  }

  return true;

    
}