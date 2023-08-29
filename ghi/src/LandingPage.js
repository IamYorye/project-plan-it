import React from "react";
import "./LandingPage.css";
import logo from "./media/logo.png";

function LandingPage() {
  return (
    <div>
      <div className="container-fluid">
        <div className="nav-container">
          <header className="nav-header">
            <div>
              <a href="/" className="planit-logo">
                <img src={logo} className="App-logo" alt="logo" />
              </a>
            </div>
            <div>
              <button type="button" className="btn btn-primary me-3">
                Login
              </button>
              <button type="button" className="btn btn-primary">
                Sign-Up
              </button>
            </div>
          </header>
        </div>
        <div className="container">
          <div className="p-5 text-center">
            <div>
              <img src={logo} className="App-logo-large" alt="logo" />
            </div>
            <h2 className="subtitle">
              Unleash Your Coding Dreams with Collaborative Projects!
            </h2>
            <p className="col-lg-8 mx-auto fs-5 text-muted">
              Welcome to Project Plan-It, the ultimate platform where software
              engineers, developers, and coders unite to transform passion into
              reality. Create, collaborate, and conquer coding projects that
              once seemed too complex to tackle alone. Join our vibrant
              community and experience the thrill of building together!
            </p>
            <div>
              <button className="browser-buttons" type="button">
                HACK THE PLANET!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
