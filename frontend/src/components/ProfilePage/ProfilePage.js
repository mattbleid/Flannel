import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [emotion, setEmotion] = useState("Unknown");
  const [loading, setLoading] = useState(true);

  // Function to fetch user data from the backend
  const fetchUserData = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.warn("No token found, please log in.");
      setLoading(false);
      return;
    }

    try {
      // Fetch user profile
      const response = await fetch("http://localhost:5001/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = await response.json();
      if (response.ok) {
        setUser({ name: userData.name, email: userData.email });
        setEmotion(userData.latest_emotion);
      } else {
        console.error("Failed to fetch user data", userData.error);
      }
    } catch (err) {
      console.error("Failed to connect to the server.", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (!localStorage.getItem("token")) {
    return (
      <div>
        <p>Please log in to view your profile.</p>
        <Link to="/login">Go to Login</Link>
      </div>
    );
  }

  return (
    <div
      className="profile-page"
      style={{ backgroundColor: "#fff", color: "#000", paddingTop: "80px" }}
    >
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-danger">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <span style={{ color: "#fff" }}>Flannel</span>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
          >
            aria-label="Toggle navigation"
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/home" style={{ color: "#fff" }}>
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container profile-content">
        <h1 className="mt-5">Welcome to Your Flannel Profile!</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="row mt-5">
            <div className="col-md-6">
              <div
                className="card mb-4"
                style={{ backgroundColor: "#000", color: "#fff" }}
              >
                <div className="card-body">
                  <h2 className="card-title">Personal Information</h2>
                  <p className="card-text">
                    <strong>Name:</strong> {user.name}
                  </p>
                  <p className="card-text">
                    <strong>Email:</strong> {user.email}
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="card"
                style={{ backgroundColor: "#c00", color: "#fff" }}
              >
                <div className="card-body">
                  <h2 className="card-title">Emotion</h2>
                  <p className="card-text">
                    <strong>Dominant Emotion:</strong> {emotion}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
