import { useEffect, useState } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import { useAuthContext } from "../../Context/AuthContext";
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
    // New UI 
    <div>
  <header className="site-header">
    <div className="container">
      <div className="row">
        <div className="col-lg-12 col-12 d-flex flex-wrap">
          <p className="d-flex me-4 mb-0">
            <i className="bi-person custom-icon me-2" />
            <strong className="text-dark">
              Welcome to LiveYard
            </strong>
          </p>
        </div>
      </div>
    </div>
  </header>
  <nav className="navbar navbar-expand-lg">
    <div className="container">
      <a
        className="navbar-brand"
        href="index.html"
      >
       LiveYard
      </a>
      {/* <a
        className="btn custom-btn d-lg-none ms-auto me-4"
        href="ticket.html"
      >
        Buy Ticket
      </a> */}
      <button
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
        className="navbar-toggler"
        data-bs-target="#navbarNav"
        data-bs-toggle="collapse"
        type="button"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse"
        id="navbarNav"
      >
        <ul className="navbar-nav align-items-lg-center ms-auto me-lg-5">
          <li className="nav-item">
            <a
              className="nav-link click-scroll"
              href="index.html#section_1"
            >
              Home
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link click-scroll"
              href="index.html#section_2"
            >
              About
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link click-scroll"
              href="index.html#section_3"
            >
              Artists
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link click-scroll"
              href="index.html#section_4"
            >
              Schedule
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link click-scroll"
              href="index.html#section_5"
            >
              Pricing
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link click-scroll"
              href="index.html#section_6"
            >
              Contact
            </a>
          </li>
        </ul>
        <a
          className="btn custom-btn d-lg-block d-none"
          href="ticket.html"
        >
          Buy Ticket
        </a>
      </div>
    </div>
  </nav>
  <section className="ticket-section section-padding">
    <div className="section-overlay" />
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-10 mx-auto">
          <form
            action="#"
            className="custom-form ticket-form mb-5 mb-lg-0"
            method="post"
            onSubmit={handleSubmit}
          >
            <h2 className="text-center mb-4">
              Sign in Here
            </h2>
            <div className="ticket-form-body">
              <input
                className="form-control"
                name="ticket-form-phone"
                placeholder="UserName"
                required
                type="text"
                value={username}
                onChange={(e) => {
                  e.preventDefault();
                  setUsername(e.target.value);
                }}
              />
              <input
                className="form-control"
                name="ticket-form-phone"
                required
                type="password"
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
              <div className="col-lg-4 col-md-10 col-8 mx-auto">
                <button
                  className="form-control"
                  type="submit"
                >
                  Sign in
                </button>
              </div>
              <p className="">New to LiveYard?<Link to="/signup">Create an account</Link></p>
               <p className="mt-5 mb-3 text-muted">© 2017-2018</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
  <footer className="site-footer">
    <div className="site-footer-top">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-12">
            <h2 className="text-white mb-lg-0">
              LiveYard
            </h2>
          </div>
          <div className="col-lg-6 col-12 d-flex justify-content-lg-end align-items-center">
            <ul className="social-icon d-flex justify-content-lg-end">
              <li className="social-icon-item">
                <a
                  className="social-icon-link"
                  href="#"
                >
                  <span className="bi-twitter" />
                </a>
              </li>
              <li className="social-icon-item">
                <a
                  className="social-icon-link"
                  href="#"
                >
                  <span className="bi-apple" />
                </a>
              </li>
              <li className="social-icon-item">
                <a
                  className="social-icon-link"
                  href="#"
                >
                  <span className="bi-instagram" />
                </a>
              </li>
              <li className="social-icon-item">
                <a
                  className="social-icon-link"
                  href="#"
                >
                  <span className="bi-youtube" />
                </a>
              </li>
              <li className="social-icon-item">
                <a
                  className="social-icon-link"
                  href="#"
                >
                  <span className="bi-pinterest" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div className="container">
      <div className="row">
        <div className="col-lg-6 col-12 mb-4 pb-2">
          <h5 className="site-footer-title mb-3">
            Links
          </h5>
          <ul className="site-footer-links">
            <li className="site-footer-link-item">
              <a
                className="site-footer-link"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="site-footer-link-item">
              <a
                className="site-footer-link"
                href="#"
              >
                About
              </a>
            </li>
            <li className="site-footer-link-item">
              <a
                className="site-footer-link"
                href="#"
              >
                Artists
              </a>
            </li>
            <li className="site-footer-link-item">
              <a
                className="site-footer-link"
                href="#"
              >
                Schedule
              </a>
            </li>
            <li className="site-footer-link-item">
              <a
                className="site-footer-link"
                href="#"
              >
                Pricing
              </a>
            </li>
            <li className="site-footer-link-item">
              <a
                className="site-footer-link"
                href="#"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div className="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
          <h5 className="site-footer-title mb-3">
            Have a question?
          </h5>
          <p className="text-white d-flex mb-1">
            <a
              className="site-footer-link"
              href="tel: 090-080-0760"
            >
              090-080-0760
            </a>
          </p>
          <p className="text-white d-flex">
            <a
              className="site-footer-link"
              href="mailto:hello@company.com"
            >
              hello@company.com
            </a>
          </p>
        </div>
        <div className="col-lg-3 col-md-6 col-11 mb-4 mb-lg-0 mb-md-0">
          <h5 className="site-footer-title mb-3">
            Location
          </h5>
          <p className="text-white d-flex mt-3 mb-2">
            Silang Junction South, Tagaytay, Cavite, Philippines
          </p>
          <a
            className="link-fx-1 color-contrast-higher mt-3"
            href="#"
          >
            <span>
              Our Maps
            </span>
            <svg
              aria-hidden="true"
              className="icon"
              viewBox="0 0 32 32"
            >
              <g
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle
                  cx="16"
                  cy="16"
                  r="15.5"
                />
                <line
                  x1="10"
                  x2="16"
                  y1="18"
                  y2="12"
                />
                <line
                  x1="16"
                  x2="22"
                  y1="12"
                  y2="18"
                />
              </g>
            </svg>
          </a>
        </div>
      </div>
    </div>
    <div className="site-footer-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-12 mt-5">
            <p className="copyright-text">
              Copyright © 2036 Festava Live Company
            </p>
            <p className="copyright-text">
              Distributed by:{' '}
              <a href="https://themewagon.com">
                ThemeWagon
              </a>
            </p>
          </div>
          <div className="col-lg-8 col-12 mt-lg-5">
            <ul className="site-footer-links">
              <li className="site-footer-link-item">
                <a
                  className="site-footer-link"
                  href="#"
                >
                  Terms & Conditions
                </a>
              </li>
              <li className="site-footer-link-item">
                <a
                  className="site-footer-link"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li className="site-footer-link-item">
                <a
                  className="site-footer-link"
                  href="#"
                >
                  Your Feedback
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </footer>
</div>



  );
}
