
import React, { useRef, useEffect, useState } from "react";
import "./Camera.css"; // Import CSS file for styling

function Camera() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [dominantEmotion, setDominantEmotion] = useState("");

  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing the camera:", err);
        setError("Failed to access the camera. Please ensure the camera is working and the site has permission to access it.");
      }
    };

    initializeCamera();

    return () => {
      // Clean up the video stream when the component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = async () => {
    if (!videoRef.current) {
      setError("No video stream available.");
      return;
    }

    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("image", blob);

      try {
        const response = await fetch("http://localhost:5001/analyze", {
          method: "POST",
          body: formData,
        });
        const data = await response.json();

        // Set the dominant emotion
        if (data.dominant_emotion) {
          setDominantEmotion(data.dominant_emotion);
        } else {
          setDominantEmotion("");
        }
        handleEmotionAnalysis(data);
      } catch (error) {
        console.error("Failed to analyze emotion:", error);
        setError("Failed to analyze emotion.");
      }
    });
  };

  const handleEmotionAnalysis = (data) => {
    if (data.dominant_emotion) {
      console.log("Dominant Emotion:", data.dominant_emotion);

      // Additional logic based on dominant emotion
      switch (data.dominant_emotion) {
        case "angry":
          showAlert("You appear to be angry. Take a deep breath and relax your muscles!");
          break;
        case "sad":
          showAlert("It seems you are sad. Let's turn that frown upside down!");
          break;
        case "happy":
          // Handle happy emotion
          break;
        case "neutral":
          // Handle neutral emotion
          break;
        case "surprised":
          // Handle surprised emotion
          break;
        default:
          break;
      }
    }
  };

  const showAlert = (message) => {
    const title = "Flannel";
    window.alert(title + ": " + message)
  }

  useEffect(() => {
    const intervalId = setInterval(captureImage, 5000);

    return () => clearInterval(intervalId);
  }, []);

  return React.createElement(
    "div",
    { className: "camera-container" },
    React.createElement("video", { ref: videoRef, autoPlay: true, playsInline: true, className: "video" }),
    dominantEmotion && React.createElement("div", { className: "emotion-display" }, "Dominant Emotion: ", dominantEmotion),
    error && React.createElement("div", null, "Error: ", error)
  );
}

export default Camera;
