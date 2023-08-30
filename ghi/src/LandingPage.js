import React from "react";
import "./LandingPage.css";
import video from "./media/solarsystem.mp4";

const mediaFiles = require.context("./media", false, /\.(png|mp4)$/);

const media = mediaFiles.keys().reduce((acc, curr) => {
  const key = curr.split("/").pop();
  acc[key] = mediaFiles(curr).default;
  return acc;
}, {});

function LandingPage() {
  return (
    <div>
      <div className="container-fluid">
        <video autoPlay muted loop>
          <source src={video} className="video" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="nav-container">
          <header className="nav-header">
            <div>
              <a href="/" className="planit-logo">
                <img
                  src={require("./media/logo.png")}
                  className="App-logo"
                  alt="logo"
                />
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
          <div className="page-section">
            <div>
              <img
                src={require("./media/logo.png")}
                className="App-logo-large"
                alt="logo"
              />
            </div>
            <h2 className="subtitle">
              Unleash Your Coding Dreams with Collaborative Projects!
            </h2>
            <p className="page-text">
              Welcome to Project Plan-It, the ultimate platform where software
              engineers, developers, and coders unite to transform passion into
              reality. Create, collaborate, and conquer coding projects that
              once seemed too complex to tackle alone. Join our vibrant
              community and experience the thrill of building together!
            </p>
            <div>
              <button className="browser-buttons" type="button">
                JOIN OUR COMMUNITY!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="page-section-middle">
          <div className="page-text-middle">
            <h2>Elevate Your Coding Journey in A Supportive Community!</h2>
            <p>
              Dive into a world tailored for coding enthusiasts like you. At
              Project Plan-It, we're a gathering of developers, engineers, and
              coders of all languages, ready to embark on ambitious projects
              together. Whether you're starting a new venture or offering your
              expertise as a mentor, this is where ideas flourish and
              friendships form.
            </p>
            <div>
              <button className="browser-buttons" type="button">
                SIGN UP NOW!
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="my-5">
          <div className="p-5 text-center bg-body-tertiary">
            <div className="container py-5">
              <h2 className="page-text-middle">
                Empowering Coders: Where Collaboration Ignites Brilliance!
              </h2>
              <div className="features-grid">
                <div className="grid-item">
                  <img
                    src={require("./media/lightbulb.png")}
                    className="icon"
                  />
                  <h3>Ideas</h3>
                  <p>
                    Ignite innovation in our creative hub! Share and refine
                    coding project ideas with a vibrant community of
                    visionaries. Together, we'll shape concepts into
                    groundbreaking projects that redefine coding possibilities.
                  </p>
                </div>

                <div className="grid-item">
                  <img src={require("./media/gears.png")} className="icon" />
                  <h3>Create</h3>
                  <p>
                    Transform ideas into reality with our intuitive project
                    creation tools. Build a dedicated space for your coding
                    dreams, where you can outline, plan, and lay the foundation
                    for your ambitious projects.
                  </p>
                </div>
                <div className="grid-item">
                  <img src={require("./media/group.png")} className="icon" />
                  <h3>Collaborate</h3>
                  <p>
                    Join forces with a community of passionate coders. Find
                    mentors, share insights, and synergize your skills to
                    conquer challenges together. Collaboration fuels innovation,
                    and together, we turn concepts into cutting-edge creations.
                  </p>
                </div>
                <div className="grid-item">
                  <img src={require("./media/publish.png")} className="icon" />
                  <h3>Publish</h3>
                  <p>
                    It's time to unveil your masterpiece to the world. With a
                    few clicks, your project goes live, accessible to
                    enthusiasts, potential users, and fellow developers. Embrace
                    the satisfaction of sharing your coding triumphs with a
                    global audience.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="my-5">
          <div className="p-5 text-center bg-body-tertiary">
            <div className="container py-5">
              <h1 className="text-body-emphasis">Full-width jumbotron</h1>
              <p className="col-lg-8 mx-auto lead">
                This takes the basic jumbotron above and makes its background
                edge-to-edge with a <code>.container</code> inside to align
                content. Similar to above, it's been recreated with built-in
                grid and utility classes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="my-5">
          <div className="p-5 text-center bg-body-tertiary">
            <div className="container py-5">
              <h1 className="text-body-emphasis">Full-width jumbotron</h1>
              <p className="col-lg-8 mx-auto lead">
                This takes the basic jumbotron above and makes its background
                edge-to-edge with a <code>.container</code> inside to align
                content. Similar to above, it's been recreated with built-in
                grid and utility classes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="my-5">
          <div className="p-5 text-center bg-body-tertiary">
            <div className="container py-5">
              <h1 className="text-body-emphasis">Full-width jumbotron</h1>
              <p className="col-lg-8 mx-auto lead">
                This takes the basic jumbotron above and makes its background
                edge-to-edge with a <code>.container</code> inside to align
                content. Similar to above, it's been recreated with built-in
                grid and utility classes.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <footer className="nav-header">
          <div>
            <p>© 2023 Planiteers</p>
          </div>
          <div className="footer-nav">
            <nav>
              <a href="/">Home</a>
            </nav>
            <nav>
              <a ahref="/">Pricing</a>
            </nav>
            <nav>
              <a ahref="/">About</a>
            </nav>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default LandingPage;
