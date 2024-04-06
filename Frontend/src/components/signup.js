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

  return (
    <form className="form-signin" onSubmit={handleSubmit}>
      <img
        className="mb-4"
        src="https://getbootstrap.com/assets/brand/bootstrap-solid.svg"
        alt=""
        width={72}
        height={72}
      />
      <h1 className="h3 mb-3 font-weight-normal">Please sign Up</h1>
      <label htmlFor="inputFullName" className="sr-only">
        Full Name
      </label>
      <input
        type="text"
        id="fullName"
        className="form-control"
        value={inputs.fullName}
        onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
        placeholder="FULLNAME"
        required=""
        autoFocus=""
      />
      <label htmlFor="inputUsername" className="sr-only">
        Username
      </label>
      <input
        type="text"
        id="inputUsername"
        className="form-control"
        value={inputs.username}
        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
        placeholder="USERNAME"
        required=""
      />
      <label htmlFor="inputPassword" className="sr-only">
        Password
      </label>
      <input
        type="password"
        id="inputPassword"
        className="form-control"
        value={inputs.password}
        onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
        placeholder="PASSWORD"
        required=""
      />
      <label htmlFor="inputConfirmPassword" className="sr-only">
        Confirm Password
      </label>
      <input
        type="password"
        id="inputConfirmPassword"
        className="form-control"
        value={inputs.confirmPassword}
        onChange={(e) =>
          setInputs({ ...inputs, confirmPassword: e.target.value })
        }
        placeholder="CONFIRM PASSWORD"
        required=""
      />

      <label htmlFor="inputEmail" className="sr-only">
        Email
      </label>
      <input
        type="email"
        id="inputEmail"
        className="form-control"
        value={inputs.email}
        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
        placeholder="EMAIL"
        required=""
      />

      <label htmlFor="inputGender" className="sr-only">
        Gender
      </label>
      <input
        type="text"
        id="inputGender"
        className="form-control"
        value={inputs.gender}
        onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
        placeholder="GENDER"
        required=""
      />
      <button className="btn btn-lg btn-primary btn-block" type="submit">
        Sign Up
      </button>
      <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
    </form>
  );
}
