import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
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
      <section>
        <div className="container py-4 py-xl-5">
          <div className="row mb-5">
            <div className="col-md-8 col-xl-6 text-center mx-auto">
              <h2>Flannel</h2>
              <p className="w-lg-50">A Mental Health Experience</p>
            </div>
          </div>
          <div className="row gy-4 row-cols-1 row-cols-md-2 row-cols-xl-3">
            <div className="col">
              <div className="card">
                <img
                  className="card-img-top w-100 d-block fit-cover"
                  src="/assets/img/illustrations/_ecb9ff52-5cd8-4dc4-b77f-085513282b8e.jpeg"
                  alt="Feeling Down?"
                />
                <div className="card-body p-4">
                  <h4 className="card-title">Feeling Down?</h4>
                  <p className="card-text">
                    At Flannel, we believe in the power of self-awareness to
                    foster your well-being. Our emotion recognition technology
                    helps you identify your emotional state in real time,
                    providing you with immediate insights and personalized
                    feedback.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img
                  className="card-img-top w-100 d-block fit-cover"
                  src="/assets/img/illustrations/_eacf784d-53b2-44b3-8e44-0b347add64a7.jpeg"
                  alt="Mental Health at Your Finger Tips"
                />
                <div className="card-body p-4">
                  <h4 className="card-title">
                    Mental Health at Your Finger Tips
                  </h4>
                  <p className="card-text">
                    Flannel offers access to tools and resources designed to
                    monitor and improve your emotional well-being at palm of
                    your hands. With just a few taps, you can explore various
                    resources and strategies to tackle your mental health.
                  </p>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="card">
                <img
                  className="card-img-top w-100 d-block fit-cover"
                  src="/assets/img/illustrations/_468c719d-5f57-4b2b-beab-d2112250d59d.jpeg"
                  alt="Track Your Emotional Journey"
                />
                <div className="card-body p-4">
                  <h4 className="card-title">Track Your Emotional Journey</h4>
                  <p className="card-text">
                    Monitor your mood fluctuations over time with our intuitive
                    mood tracker. Log your feelings, see patterns, and gain
                    deeper insights into your mental health. Understanding your
                    emotional trends can help you manage stress and enhance your
                    life on the daily.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer>
        <div className="container py-4 py-lg-5">
          <hr />
          <div className="text-muted d-flex justify-content-between align-items-center pt-3">
            <p className="mb-0">Copyright © 2024 Flannel</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
