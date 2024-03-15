import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import Login from "./components/login";
import Signup from "./components/signup";
import Lobby from "./components/lobby";
import { createBrowserRouter,RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <Signup />
  },
  {
    path: "/lobby",
    element: <Lobby />
  }
])
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>
);
