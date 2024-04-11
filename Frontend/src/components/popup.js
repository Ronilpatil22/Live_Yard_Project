import React, { useState } from "react";
import "./popup.css";
import useStream from "../hooks/useStream";

const Popup = ({ onClose,onSubmit }) => {
  const {stream} = useStream();
  const [streamKey,setStreamKey] = useState("");
  function handleChange(e){
    e.preventDefault();
    setStreamKey(e.target.value);
  
    console.log(streamKey);
  }
  function handlesubmit(e){
    e.preventDefault();
    onClose();
    stream(streamKey,"250000","604030","24");
    onSubmit(e,streamKey);
  }
  return (
    <div className="popup-container">
    <div className="popup">
         <button className="close" onClick={onClose}>✖</button>
      <form>
        <input type="text" value={streamKey} placeholder="Stream-Key" onChange={handleChange}></input>
        {/* <button className="opacity" onClick={(e)=>{
          onSubmit(e,streamKey)}}>Submit</button> */}
          <button className="opacity" onClick={handlesubmit}>Submit</button>
      </form>
    </div>
  </div>
  );
};

export default Popup;
