import "./App.css";
import { Navigate, Route, Routes } from 'react-router-dom'
import { useAuthContext } from "./Context/AuthContext";
import wallpaper from "./images/wallpaper.jpg";
import { Link } from "react-router-dom";
import Login from "./components/login";
import Home from "./components/Home";
import Signup from "./components/signup";
function App() {
  const {authUser}=useAuthContext();
  return (
    <>
    <div className="App">
    <Routes>
      <Route path='/' element={authUser?<Home/>:<Navigate to='/login'/>}></Route>
      <Route path='/login' element={authUser?<Navigate to='/'/>:<Login/>}></Route>
      <Route path='/signup' element={authUser?<Navigate to='/'/>:<Signup/>}></Route>
       
      </Routes>

      </div>
    </>
  );
}

export default App;
