
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext';
const useLogin = ()=>{
    const {setAuthUser} = useAuthContext();
    const login  = async(username,password)=>{
        const success = handleInputError({username,password});
        if(!success) return true;

        try{
            console.log(username,password);
            const res = await fetch('http://localhost:3000/api/login',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({username,password})
            })

            const data = await res.json();
            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user",JSON.stringify(data));
            setAuthUser(data);
        }catch(error){
            toast.error(error.message);
        }

    }

    return {login};
}

export default useLogin;

function handleInputError({username,password}){
    if( !username || !password ){
          toast.error("Please fill in all the fields");
          return false;
    }

    return true;
}