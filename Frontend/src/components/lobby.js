import "./lobby.css";
import { useEffect, useState } from "react";
import camera from "../images/camera.png";
import mic from "../images/mic.png";
import chat from "../images/chat.png";

let localStream;
export default function Lobby() {
  const [Messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

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

  useEffect(() => {
    const divider = document.getElementById("divider");
    const container = document.getElementById("container");
    const videos = document.getElementById("videos");
    const chatContainer = document.getElementById("chat-container");

    let isResizing = false;

    divider.addEventListener("mousedown", (e) => {
      isResizing = true;
      document.addEventListener("mousemove", handleMouseMove);
    });

    document.addEventListener("mouseup", () => {
      isResizing = false;
      document.removeEventListener("mousemove", handleMouseMove);
    });

    function handleMouseMove(e) {
      if (isResizing) {
        const offset = container.getBoundingClientRect();
        const newWidth = e.clientX - offset.left;
        videos.style.width = `${newWidth}px`;
        chatContainer.style.width = `calc(100% - ${newWidth}px)`;
      }
    }
  });
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
  function toggleChat(e) {
    e.preventDefault();
    var chatContainer = document.getElementById("chat-container");
    document.getElementById("chat-btn").style.backgroundColor =
      document.getElementById("chat-btn").style.backgroundColor ===
      "rgb(255, 80, 80)"
        ? "rgb(179, 102, 249, .9)"
        : "rgb(255, 80, 80)";
    chatContainer.style.display =
      chatContainer.style.display === "none" ? "block" : "none";
  }
  function handleSendMessage(e) {
    e.preventDefault();
    setMessages([
      ...Messages,
      {
        id: Messages.length,
        message: currentMessage,
      },
    ]);
    setCurrentMessage("");
    console.log(Messages);
  }
  return (
    <>
      <div id="videos">
        <video
          className="video-player"
          id="user-1"
          autoPlay
          playsInline
        ></video>
        <div id="divider"></div>
        <div id="chat-container" className="chat-container">
          {Messages.map((message) => (
            <div className="messages" key={message.id}>
              {message.message}
            </div>
          ))}
          <div className="input-container">
            <input
              type="text"
              id="message-input"
              value={currentMessage}
              placeholder="Type a message..."
              onChange={(e) => {
                e.preventDefault();
                setCurrentMessage(e.target.value);
              }}
            />
            <button id="send-button" onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
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
          id="chat-btn"
          onClick={(e) => {
            toggleChat(e);
          }}
        >
          <img src={chat} alt="chat" />
        </button>
      </div>
    </>
  );
}
