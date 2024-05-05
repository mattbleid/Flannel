import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Resources() {
  const [isSticky, setIsSticky] = useState(false);
  const [isSmallScreen, setSmallScreen] = useState(false);

  const handleScroll = () => {
    // Set the navbar sticky based on scroll position
    const sticky = window.scrollY > 50;
    setIsSticky(sticky);
  };

  const handleResize = () => {
    setSmallScreen(window.innerWidth <= 600);
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize)
    handleResize();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <header className={`${isSticky ? "sticky" : ""}`}>
        <nav
          className="navbar navbar-expand-md bg-body py-3"
          style={
            isSticky
              ? { position: "fixed", top: 0, width: "100%", zIndex: 1000 }
              : null
          }
        >
          <div className="container">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <strong>
                <span style={{ color: "rgb(207, 6, 6)" }}>Flannel</span>
              </strong>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navcol-2"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navcol-2">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/moodtracker">
                    Mood Tracker
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/camera">
                    Camera
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/resources">
                    Resources
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/profile">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Sign In
                  </Link>
                </li>
              </ul>
              <Link
                className="btn btn-primary ms-md-2"
                to="/signup"
                style={{ background: "rgb(207,6,6)" }}
              >
                Create Account
              </Link>
            </div>
          </div>
        </nav>
      </header>
      <style>
        {`
          .container {
            max-width: 960px;
            margin: auto;
            padding: 20px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }

          h1, h2 {
            color: rgb(207, 6, 6);
          }

          .resource-section {
            margin-bottom: 20px;
          }

          .resource-section h2 {
            margin-top: 20px;
          }

          .resource-section p {
            font-size: 16px;
            line-height: 1.6;
            color: #333;
          }

          a {
            color: rgb(207, 6, 6);
            text-decoration: none;
          }

          a:hover {
            text-decoration: underline;
          }

          footer {
            margin-top: 40px;
            color: #666;
          }

          footer a {
            color: rgb(207, 6, 6);
          }

          footer a:hover {
            text-decoration: underline;
          }
        `}
      </style>
      <div className="container">
        <h1>Mental Health Resources</h1>
        <div className="resource-section">
          <h2>Understanding Mental Health</h2>
          <p>
            Mental health includes our emotional, psychological, and social
            well-being. It affects how we think, feel, and act as we cope with
            life. Learn more about mental health and how to improve it.
          </p>
          <a
            href="https://www.mentalhealth.gov/basics/what-is-mental-health"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
        <div className="resource-section">
          <h2>Help for Mental Illnesses</h2>
          <p>
            If you or someone you know has a mental illness, there are many
            resources to get help. Use these resources to find help you, a
            friend, or a family member.
          </p>
          <a
            href="https://www.nimh.nih.gov/health/find-help"
            target="_blank"
            rel="noopener noreferrer"
          >
            Find Help
          </a>
        </div>
        <div className="resource-section">
          <h2>Immediate Help</h2>
          <p>
            If you are in crisis and need immediate support or intervention,
            call, or go to the emergency room of the nearest hospital.
          </p>
          <a
            href="https://suicidepreventionlifeline.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Suicide Prevention Lifeline
          </a>
        </div>
        <footer>
          <p>
            For more information on mental health, please visit{" "}
            <a
              href="https://www.mentalhealthfirstaid.org/mental-health-resources/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Mental Health First Aid
            </a>
            .
          </p>
        </footer>
      </div>
    </>
  );
}

export default Resources;
