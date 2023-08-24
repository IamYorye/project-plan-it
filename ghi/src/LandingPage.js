import React from "react";
import { NavLink } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landing-page">
      <header>
        <nav>
          {/* Navigation Links */}
          <NavLink to="/">Home</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>

      <main>
        <section className="intro-section">
          <img src="path_to_logo_image" alt="Application Logo" />
          <p>Your Application Description Here...</p>
          <div className="cta-buttons">
            <NavLink to="/signup" className="cta-button">
              Sign Up
            </NavLink>
            <NavLink to="/login" className="cta-button">
              Login
            </NavLink>
          </div>
        </section>

        <section className="info-section">
          {/* Additional Information */}
          <p>More about your platform, its benefits, and how it works.</p>
        </section>

        <section className="projects-section">
          <h2>Current Projects</h2>
          <div className="projects-grid">
            {/* Sample card, you can loop this when you have real data */}
            {[...Array(8)].map((_, index) => (
              <div key={index} className="project-card">
                <img src="path_to_project_image" alt="Project title" />
                <h3>Sample Project {index + 1}</h3>
                <p>Short project description...</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Optionally add a footer here if needed */}
    </div>
  );
};

export default LandingPage;
