

const useStream =()=>{
    const stream = async({streamKey,audioBitsPerSecond,videoBitsPerSecond,framerate})=>{
            try{
                const res = await fetch('http://localhost:3000/stream',{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({streamKey,audioBitsPerSecond,videoBitsPerSecond,framerate})
                    })
        
                    const data = await res.json();
                    if(data.error){
                        throw new Error(data.error);
                    }

                    console.log(data);
            }catch(error){
                console.log(error.message);
            }
    }

    return {stream};
}

export default useStream;