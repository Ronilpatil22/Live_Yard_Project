import "./lobby.css";
import { useEffect, useState, useRef } from "react";
import camera from "../images/camera.png";
import mic from "../images/mic.png";
import invite from "../images/invite.png";
import Popup from "./popup";
let localStream;
export default function Lobby() {
  const [stream,setStream] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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

  let toggleCamera = async (e) => {
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
  let toggleMic = async (e) => {
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
  if(stream.length>0){
    connect(stream);
  }
  async function connect(stream){
    const url = "rtmp://a.rtmp.youtube.com/live2" + stream;

  }
  function handleSubmit(e){
    setStream(e.target.value);
    
  }
  return (
    <>
      {isPopupOpen && <Popup onClose={closePopup} onSubmit={handleSubmit}/>}
       <div id="videos">
        <video
          className="video-player"
          id="user-1"
          autoPlay
          playsInline
        ></video>
      </div>

      <div id="controls">
        <button
          className="control-container"
          id="camera-btn"
          onClick={(e) => {
            toggleCamera(e);
          }}
        >
          <img src={camera} alt="camera" />
        </button>
        <button
          className="control-container"
          id="mic-btn"
          onClick={(e) => {
            toggleMic(e);
          }}
        >
          <img src={mic} alt="mic" />
        </button>

        <button
          className="control-container"
          id="invite-btn"
          onClick={openPopup}
        >
          <img src={invite} alt="start streaming" />
        </button>
      </div> 
    </>
  );
}
