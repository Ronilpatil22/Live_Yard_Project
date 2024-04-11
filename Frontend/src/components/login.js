import { useEffect, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { useAuthContext } from "../Context/AuthContext";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useLogin();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  const { authUser } = useAuthContext();

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <img
        className="mb-4"
        src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg"
        alt=""
        width={72}
        height={72}
      />
      <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
      <label htmlFor="inputUserName" className="sr-only">
        Email address
      </label>
      <input
        type="text"
        id="inputUserName"
        className="form-control"
        placeholder="USERNAME"
        required=""
        autoFocus=""
        value={username}
        onChange={(e) => {
          e.preventDefault();
          setUsername(e.target.value);
        }}
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        required=""
        value={password}
        onChange={(e) => {
          e.preventDefault();
          setPassword(e.target.value);
        }}
        placeholder="PASSWORD"
      />
      <div className="checkbox mb-3">
        <label>
          <input type="checkbox" defaultValue="remember-me" /> Remember me
        </label>
      </div>
      <button className="btn btn-lg btn-primary btn-block">
        Sign in
      </button>
      <p className="">
        New to LiveYard?<Link to="/signup">Create an account</Link>
      </p>
      <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
  );
}
