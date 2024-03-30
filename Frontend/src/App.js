import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./Context/AuthContext";
import wallpaper from "./images/wallpaper.jpg";
import { Link } from "react-router-dom";
import Login from "./components/login";
// import Lobby from "./components/lobby";
import Home from "./components/Home";
import Signup from "./components/signup";
import Lobby from "./components/lobby";
import 'bootstrap/dist/css/bootstrap.min.css';
import  'react-bootstrap';
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/lobby" element={<Lobby />}></Route>
          <Route
            path="/"
            element={<Home />}
          ></Route>
          <Route
            path="/login"
            element={ <Login />}
          ></Route>
          <Route
            path="/signup"
            element={<Signup />}
          ></Route>
          {/* <Route path='/lobby' element={authUser?<Lobby/>:<Navigate to='/login'/>}/> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
