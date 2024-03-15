import { useEffect, useState } from "react";
import "./signup.css";
import useSignup from "../hooks/useSignUp";
export default function Signup() {
  const { signup } = useSignup();
  const [inputs, setInputs] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    gender: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputs);
    await signup(inputs);
  };

  useEffect(() => {
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
  }, []);

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
          <h1 className="opacity">SIGNUP</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={inputs.fullName}
              onChange={(e) =>
                setInputs({ ...inputs, fullName: e.target.value })
              }
              placeholder="FULLNAME"
            />
            <input
              type="text"
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
              placeholder="USERNAME"
            />
            <input
              type="text"
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              placeholder="PASSWORD"
            />
            <input
              type="text"
              value={inputs.confirmPassword}
              onChange={(e) =>
                setInputs({ ...inputs, confirmPassword: e.target.value })
              }
              placeholder="CONFIRM PASSWORD"
            />
            <input
              type="email"
              value={inputs.email}
              onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
              placeholder="EMAIL"
            />
            <input
              type="text"
              value={inputs.gender}
              onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
              placeholder="GENDER"
            />
            <button className="opacity">SUBMIT</button>
          </form>
        </div>
        <div className="circle circle-two" />
      </div>
      <div className="theme-btn-container" />
    </section>
  );
}
