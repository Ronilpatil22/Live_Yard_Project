import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from "../Context/AuthContext";
import wallpaper from "../images/wallpaper.jpg";
import { Link } from "react-router-dom";
// import Login from "";
const Home = () => {
  const {authUser}=useAuthContext();
  return (
        <>
        <div className="header">
          <h1 id="login">{authUser?"":<Link to="/login">Login</Link>}</h1>
        </div>
        <img src={wallpaper} alt="wallpaper"></img>
        <button className="cyber-btn">Start Streaming Now</button>
    </>
  )
}

export default Home;
