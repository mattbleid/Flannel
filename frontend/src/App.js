import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MoodTracker from "./components/MoodTracker/MoodTracker-Draft";
import Home from "./components/Home/HomePage";
import SignInSide from "./components/SignInSide/SignInSide";
import SignUp from "./components/SignUp/SignUp";
import Camera from "./components/Camera/Camera";
import Resources from "./components/MentalHealthResources/Resources";
import Profile from "./components/ProfilePage/ProfilePage";

function App() {
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));

  // Save JWT token on successful login or registration
  const saveAuthToken = (token) => {
    console.log("Saving Auth Token:", token);
    setAuthToken(token);
    localStorage.setItem("authToken", token);
  };

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!authToken) {
        console.warn("No auth token found. Please log in.");
        return;
      }

      console.log("Auth Token Available:", authToken);

      try {
        const response = await fetch("http://localhost:5001/user/profile", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        console.log("User Profile:", data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [authToken]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/login"
          element={<SignInSide saveAuthToken={saveAuthToken} />}
        />
        <Route
          path="/signup"
          element={<SignUp saveAuthToken={saveAuthToken} />}
        />
        <Route path="/resources" element={<Resources />} />
        <Route path="/camera" element={<Camera authToken={authToken} />} />
        <Route path="/moodtracker" element={<MoodTracker />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;
