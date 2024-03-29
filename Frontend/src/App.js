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
function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/lobby" element={<Lobby />}></Route>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          ></Route>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          ></Route>
          <Route
            path="/signup"
            element={authUser ? <Navigate to="/" /> : <Signup />}
          ></Route>
          {/* <Route path='/lobby' element={authUser?<Lobby/>:<Navigate to='/login'/>}/> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
