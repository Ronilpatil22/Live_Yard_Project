import React, { useState } from "react";
import "./popup.css";

const Popup = ({ onClose,onSubmit }) => {
  const [streamKey,setStreamKey] = useState("");
  function handleChange(e){
    e.preventDefault();
    setStreamKey(e.target.value);
  }
  return (
    <div className="popup-container">
    <div className="popup">
         <button className="close" onClick={onClose}>✖</button>
      <form>
        <input type="text" value={streamKey} placeholder="Stream-Key" onChange={handleChange}></input>
        <button className="opacity" onClick={(e)=>{
          onSubmit(e,streamKey)}}>Submit</button>
      </form>
    </div>
  </div>
  );
};

export default Popup;
