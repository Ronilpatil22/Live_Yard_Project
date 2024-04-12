import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./Context/AuthContext";
import wallpaper from "./components/images/wallpaper.jpg";
import { Link } from "react-router-dom";
import Login from "./components/js/login";
import Home from "./components/js/Home";
import Signup from "./components/js/signup";
import Lobby from "./components/js/lobby";
import 'bootstrap/dist/css/bootstrap.min.css';
import  'react-bootstrap';
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min";
import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/components/css/bootstrap.min.css";
import "../src/components/css/bootstrap-icons.css";
import "../src/components/css/templatemo-festava-live.css";

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/lobby" element={authUser?<Lobby />:<Login/>}></Route>
          <Route
            path="/"
            element={authUser?<Home />:<Login/>}
          ></Route>
          <Route
            path="/login"
            element={authUser?<Home/>:<Login />}
          ></Route>
          <Route
            path="/signup"
            element={authUser?<Home/>:<Signup/>}
          ></Route>
          {/* <Route path='/lobby' element={authUser?<Lobby/>:<Navigate to='/login'/>}/> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
