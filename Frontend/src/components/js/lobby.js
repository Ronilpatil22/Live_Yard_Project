import "..css/lobby.css";
import { useEffect, useState, useRef } from "react";
import camera from "../images/camera.png";
import mic from "../images/mic.png";
import invite from "../images/invite.png";
import { socket } from '../../socket';
import Popup from "./popup";
import useStream from "../../hooks/useStream";

let localStream;

export default function Lobby() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isVideoOnCanvas, setIsVideoOnCanvas] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    async function connect() {
      if (!localStream) {
        localStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        document.getElementById("user-1").srcObject = localStream;
      
      }
    }
    connect();
  }, []);

  const toggleVideoOnCanvas = () => {
    
    setIsVideoOnCanvas(prevState => !prevState);
  };

  const toggleCamera = async (e) => {
    e.preventDefault();
    let videoTrack = localStream
      .getTracks()
      .find((track) => track.kind === "video");

    if (videoTrack.enabled) {
      videoTrack.enabled = false;
      document.getElementById("camera-btn").style.backgroundColor =
        "rgb(255, 80, 80)";
    } else {
      videoTrack.enabled = true;
      document.getElementById("camera-btn").style.backgroundColor =
        "rgb(179, 102, 249, .9)";
    }
  };

  const toggleMic = async (e) => {
    e.preventDefault();
    let audioTrack = localStream
      .getTracks()
      .find((track) => track.kind === "audio");

    if (audioTrack.enabled) {
      audioTrack.enabled = false;
      document.getElementById("mic-btn").style.backgroundColor =
        "rgb(255, 80, 80)";
    } else {
      audioTrack.enabled = true;
      document.getElementById("mic-btn").style.backgroundColor =
        "rgb(179, 102, 249, .9)";
    }
  };

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  async function handleSubmit(e, streamKey) {
    e.preventDefault();
    socket.connect();
    socket.on("connect", () => {
      console.log("Connected to server");
    });
    socket.on("error",(err)=>{
      console.log(err)
    })
    socket.emit("userCookie", streamKey);

    const recorder = new MediaRecorder(localStream, {
      audioBitsPerSecond: 128000,
      videoBitsPerSecond: 2500000,
      framerate: 25,
    });

    recorder.ondataavailable = function (event) {
      if (event.data.size > 0) {
        console.log("Binary data incoming...");
        socket.emit("binarystream", event.data);
      }
    };

    socket.on("disconnect",()=>{
      console.log("Socket connection disconnected")
    })

    recorder.start(25);
  }

  function handleHover() {
    document.getElementById("videobutton").style.display = "block";
    
     
    
  }

  function handleHoverLeave() {
    document.getElementById("videobutton").style.display = "none";
   
  }

  useEffect(() => {
    if (isVideoOnCanvas) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
  
      const drawFrame = () => {
        ctx.drawImage(document.getElementById("user-1"), 0, 0, canvas.width, canvas.height);
        requestAnimationFrame(drawFrame);
      };
  
      drawFrame();
      
    } 
    if(!isVideoOnCanvas){
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d"); // Create context here when isVideoOnCanvas is false
      canvasRef.current.display = "none";
     
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      console.log("In else part");
    }
  }, [isVideoOnCanvas]);
  // if(!isVideoOnCanvas){
  //   const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d"); // Create context here when isVideoOnCanvas is false
  
  //     ctx.clearRect(0, 0, canvas.width, canvas.height);
  // }
console.log(isVideoOnCanvas);
  return (
    <>
      {isPopupOpen && <Popup onClose={closePopup} onSubmit={handleSubmit} />}
     
      <div onMouseEnter={handleHover} onMouseLeave={handleHoverLeave}>
        <video className="video-player" id="user-1" autoPlay playsInline></video>
        <button id="videobutton" className="btn btn-primary" onClick={toggleVideoOnCanvas}>
          {isVideoOnCanvas ? "Remove Video from Canvas" : "Display Video on Canvas"}
        </button> 
      </div>
      
      <div className="canvas">
        <canvas ref={canvasRef} width="850" height="450"></canvas>
      </div>
      
      <div id="controls">
        <button className="control-container" id="camera-btn" onClick={toggleCamera}>
          <img src={camera} alt="camera" />
        </button>
        <button className="control-container" id="mic-btn" onClick={toggleMic}>
          <img src={mic} alt="mic" />
        </button>
        <button className="control-container" id="invite-btn" onClick={openPopup}>
          <img src={invite} alt="start streaming" />
        </button>
      </div>

      <div className="GoLive">
        <button className="btn btn-primary">Go Live</button>
      </div>
    </>
  );
}
