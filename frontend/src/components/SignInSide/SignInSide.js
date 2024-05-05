import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignInSide() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (response.ok) {
        // Store the JWT token in local storage
        localStorage.setItem("token", data.token);
        navigate("/home");
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Failed to connect to the server.");
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-danger">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span style={{ color: "#fff" }}>Flannel</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home" style={{ color: "#fff" }}>
                  Home
                </Link>
              </li>
            </ul>
            <Link
              className="btn btn-primary"
              to="/signup"
              style={{ backgroundColor: "rgb(207,6,6)" }}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </nav>
      <section className="py-4 py-md-5 my-5">
        <div className="container py-md-5">
          <div className="row">
            <div className="col-md-6 text-center">
              <img
                className="img-fluid w-100"
                src="/assets/img/illustrations/Flannel_Draft-ai-brush-removebg-3997ylfr.png"
                alt="Flannel Logo"
              />
            </div>
            <div className="col-md-5 col-xl-4 text-start align-self-center">
              <h6 className="display-5 fw-bold mb-5">Sign in to Flannel</h6>
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-5">
                  <button className="btn btn-primary" type="submit">
                    Log in
                  </button>
                </div>
              </form>
              {error && <div className="alert alert-danger">{error}</div>}
              <p className="text-muted">
                <Link to="/signup">Don't have an account? Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default SignInSide;
