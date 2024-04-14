import "../css/lobby.css";
import { useEffect, useState, useRef } from "react";
import camera from "../images/camera.png";
import mic from "../images/mic.png";
import cast from "../images/cast.png";
import { socket } from '../../socket';
import Popup from "./popup";
import useStream from "../../hooks/useStream";
import "../css/bootstrap.min.css";
import "../css/bootstrap-icons.css";
import "../css/templatemo-festava-live.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';

let localStream;

export default function Lobby() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isVideoOnCanvas, setIsVideoOnCanvas] = useState(false);
  const [isCastOnCanvas,setIsCastOnCanvas] = useState(false);
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

  const toggleCastOnCanvas = () => {
    
    setIsCastOnCanvas(prevState => !prevState);
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

  async function captureScreen() {
    let mediaStream = null;
    try {
        mediaStream = await navigator.mediaDevices.getDisplayMedia({
            video: {
                cursor: "always"
            },
            audio: false
        });
        document.getElementById("canvas-1").srcObject = mediaStream;
    } catch (ex) {
        console.log("Error occurred", ex);
    }
    return mediaStream;
}

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
    // const canvas = canvasRef.current;
    // const ctx = canvas.getContext("2d");
  
    // let animationFrameId;
  
    // const drawFrame = () => {
    //   // Clear the canvas
    //   ctx.clearRect(0, 0, canvas.width, canvas.height);
  
    //   if (isVideoOnCanvas) {
    //     const video = document.getElementById("user-1");
    //     if (video instanceof HTMLVideoElement) {
    //       ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    //     } else {
    //       console.error("Element with ID 'user-1' is not a video element");
    //     }
    //   } else {
    //     const image = document.querySelector(".canvas");
    //     if (image instanceof HTMLImageElement) {
    //       ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    //     } else {
    //       console.error("Element with class 'canvas' is not an image element");
    //     }
    //   }
  
    //   animationFrameId = requestAnimationFrame(drawFrame);
    // };
  
    // drawFrame();
  
    // // Cleanup function
    // return () => {
    //   cancelAnimationFrame(animationFrameId);
    // };

    //My Code
    let videoElement = document.getElementById("canvas-1");

  // When isVideoOnCanvas is true, display the video stream directly in the video element
  if (isVideoOnCanvas) {
    const video = document.getElementById("user-1");
    if (video instanceof HTMLVideoElement) {
      videoElement.srcObject = video.srcObject;
      videoElement.play();
    } else {
      console.error("Element with ID 'user-1' is not a video element");
    }
  } else {
    // When isVideoOnCanvas is false, clear the video stream from the video element
    videoElement.srcObject = null;
  }
  }, [isVideoOnCanvas]);

  useEffect(() => {
  //   if (isCastOnCanvas) {
  //     const canvas = canvasRef.current;
  //     const ctx = canvas.getContext("2d");
  //     let videoElement;
  
  //     const drawFrame = () => {
  //       // Clear the canvas
  //       ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //       // Draw the screen share stream onto the canvas
  //       ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  
  //       // Request the next frame
  //       requestAnimationFrame(drawFrame);
  //     };
  
  //     // Get the screen share stream
  //     navigator.mediaDevices
  //       .getDisplayMedia({ video: { width:1920, height: 1080 , frameRate:20 }, audio: false })
  //       .then((stream) => {
  //         // Create a video element to play the stream
  //         videoElement = document.createElement("video");
  //         videoElement.srcObject = stream;
  //         videoElement.play();
  
  //         // Start drawing frames onto the canvas
  //         drawFrame();
  //       })
  //       .catch((error) => {
  //         console.error("Error accessing screen share:", error);
  //       });
  //   }
  
  //   // Cleanup function
  //   return () => {
  //     // You may want to add cleanup logic here if needed
  //   };
  
  let videoElement = document.getElementById("canvas-1");
    videoElement.srcObject = null;
  if (isCastOnCanvas) {
    // Get the screen share stream
    navigator.mediaDevices.getDisplayMedia({ video: true, audio: false })
      .then((stream) => {
        // Set the screen share stream as the source object of the video element
        videoElement.srcObject = stream;
        videoElement.play();
      })
      .catch((error) => {
        console.error("Error accessing screen share:", error);
      });
  } else {
    // If isCastOnCanvas is false, clear the srcObject of the video element
    videoElement.srcObject = null;
  }

  // Cleanup function
  return () => {
    // Stop the screen share stream when the component unmounts
    if (videoElement.srcObject) {
      const tracks = videoElement.srcObject.getTracks();
      tracks.forEach(track => track.stop());
    }
  };
  }, [isCastOnCanvas]);
  

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
        {/* <canvas ref={canvasRef} id="canvas-1" className="canvas-canvas"></canvas> */}
        <video id="canvas-1" className="canvas-canvas" autoPlay ></video>

      </div>
      
      <div id="controls">
        <button className="control-container" id="camera-btn" onClick={toggleCamera}>
          <img src={camera} alt="camera" />
        </button>
        <button className="control-container" id="mic-btn" onClick={toggleMic}>
          <img src={mic} alt="mic" />
        </button>
        <button className="control-container" id="invite-btn" onClick={toggleCastOnCanvas}>
          <img src={cast} alt="start streaming" />
        </button>
      </div>

      <div className="GoLive">
        <button className="btn btn-primary" onClick={openPopup}>Go Live</button>
      </div>
    </>
  );
}
