import "./App.css";
import wallpaper from "./images/wallpaper.jpg";
import { Link } from "react-router-dom";
function App() {
  return (
    <>
      <div className="App">
        <div className="header">
          <h1 id="login"><Link to="/login">Login</Link></h1>
        </div>
        <img src={wallpaper} alt="wallpaper"></img>
        <button className="cyber-btn">Start Streaming Now</button>
      </div>
    </>
  );
}

export default App;
