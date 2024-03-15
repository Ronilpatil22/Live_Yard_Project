import { useEffect } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import axios from "axios"
export default function Login() {
  const themes = [
    {
      background: "#1A1A2E",
      color: "#FFFFFF",
      primaryColor: "#0F3460",
    },
    {
      background: "#461220",
      color: "#FFFFFF",
      primaryColor: "#E94560",
    },
    {
      background: "#192A51",
      color: "#FFFFFF",
      primaryColor: "#967AA1",
    },
    {
      background: "#F7B267",
      color: "#000000",
      primaryColor: "#F4845F",
    },
    {
      background: "#F25F5C",
      color: "#000000",
      primaryColor: "#642B36",
    },
    {
      background: "#231F20",
      color: "#FFF",
      primaryColor: "#BB4430",
    },
  ];
  useEffect(() => {
    const setTheme = (theme) => {
      const root = document.querySelector(":root");
      root.style.setProperty("--background", theme.background);
      root.style.setProperty("--color", theme.color);
      root.style.setProperty("--primary-color", theme.primaryColor);
      root.style.setProperty("--glass-color", theme.glassColor);
    };

    const displayThemeButtons = () => {
      const btnContainer = document.querySelector(".theme-btn-container");
      themes.forEach((theme) => {
        const div = document.createElement("div");
        div.className = "theme-btn";
        div.style.cssText = `background: ${theme.background}; width: 25px; height: 25px`;
        btnContainer.appendChild(div);
        div.addEventListener("click", () => setTheme(theme));
      });
    };

    displayThemeButtons();
  });
  async function handleSubmit(e){
    
  }

  return (
    <section className="container">
      <div className="login-container">
        <div className="circle circle-one" />
        <div className="form-container">
          <img
            src="https://raw.githubusercontent.com/hicodersofficial/glassmorphism-login-form/master/assets/illustration.png"
            alt="illustration"
            className="illustration"
          />
          <h1 className="opacity">LOGIN</h1>
          <form>
            <input type="text" placeholder="USERNAME" />
            <input type="password" placeholder="PASSWORD" />
            <button className="opacity" onClick={handleSubmit}>SUBMIT</button>
          </form>
          <div className="register-forget opacity">
          <Link to="/signup">REGISTER</Link>
            <Link to="/forgot">FORGOT PASSWORD</Link>
          </div>
        </div>
        <div className="circle circle-two" />
      </div>
      <div className="theme-btn-container" />
    </section>
  );
}
