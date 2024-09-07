import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/js/login";
import Signup from "./components/js/signup";
import { BrowserRouter, createBrowserRouter,RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./Context/AuthContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  
  <React.StrictMode>
    <BrowserRouter>
  <AuthContextProvider>
    {/* <RouterProvider router={router}></RouterProvider> */}
    <App/>
    </AuthContextProvider>
  </BrowserRouter>
  </React.StrictMode>,
  
);
