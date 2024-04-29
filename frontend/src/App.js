import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/js/bootstrap.bundle.min";
import MoodTracker from "./components/MoodTracker/MoodTracker";
import Home from "./components/Home/HomePage";
import SignInSide from "./components/SignInSide/SignInSide";
import SignUp from "./components/SignUp/SignUp";
import Camera from "./components/Camera/Camera";
import Resources from "./components/MentalHealthResources/Resources";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<SignInSide />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/camera" element={<Camera />} />
        <Route path="/moodtracker" element={<MoodTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
