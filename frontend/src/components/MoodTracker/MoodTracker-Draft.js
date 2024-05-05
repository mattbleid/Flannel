import React from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

// Styled button with dynamic background colors
const EmotionButton = styled.button`
  background-color: #f0f0f0; // Neutral gray background
  color: #333; // Dark text for contrast
  margin: 10px;
  padding: 10px 20px;
  font-size: 24px; // Larger font size for emojis
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: transform 0.3s ease, background-color 0.3s ease;

  &:hover {
    transform: scale(1.1); // Slightly enlarge the button on hover
    background-color: #e2e2e2; // Lighten background on hover
  }
`;

function MoodTracker() {
  const navigate = useNavigate();

  const handleEmotionClick = () => {
    navigate("/home");
  };

  return (
    <div className="text-center mt-5">
      <h1>Welcome to Flannel</h1>
      <p>How are you feeling today?</p>
      <div>
        <EmotionButton onClick={handleEmotionClick}>😠</EmotionButton>
        <EmotionButton onClick={handleEmotionClick}>😢</EmotionButton>
        <EmotionButton onClick={handleEmotionClick}>😐</EmotionButton>
        <EmotionButton onClick={handleEmotionClick}>😊</EmotionButton>
        <EmotionButton onClick={handleEmotionClick}>🤩</EmotionButton>
      </div>
    </div>
  );
}

export default MoodTracker;
