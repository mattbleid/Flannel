import React, { useRef, useEffect, useState, useCallback } from "react";
import "./Camera.css";

function Camera({ userEmail, authToken }) {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [dominantEmotion, setDominantEmotion] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Initialize the camera feed
  useEffect(() => {
    const initializeCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.addEventListener("loadedmetadata", () => {
            videoRef.current.play();
          });
        }
      } catch (err) {
        setError("Failed to access the camera.");
      }
    };

    initializeCamera();

    // Cleanup the camera stream
    return () => {
      const videoElement = videoRef.current; // Capture the ref value into a local variable
      if (videoElement && videoElement.srcObject) {
        const tracks = videoElement.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  // Capture an image and send it for analysis
  const captureImage = useCallback(async () => {
    if (!videoRef.current || videoRef.current.readyState !== 4) {
      setError("No video stream available or video is not ready.");
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
      formData.append("email", userEmail);

      if (!authToken) {
        setError("User is not logged in or no token is found.");
        return;
      }

      try {
        setIsAnalyzing(true);
        const response = await fetch("http://localhost:5001/analyze", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error(
            `Emotion analysis failed with status: ${response.status}`
          );
        }

        const data = await response.json();
        setDominantEmotion(data.dominant_emotion || "");
      } catch (err) {
        console.error("Analysis Error:", err);
        setError(`Failed to analyze emotion: ${err.message}`);
      } finally {
        setIsAnalyzing(false);
      }
    });
  }, [authToken, userEmail]);

  // Periodically capture and analyze images
  useEffect(() => {
    const intervalId = setInterval(captureImage, 10000); // Every 10 seconds
    return () => clearInterval(intervalId);
  }, [captureImage]);

  return (
    <div className="camera-container">
      <video ref={videoRef} autoPlay playsInline className="video" />
      {dominantEmotion && (
        <div className="emotion-display">
          Dominant Emotion: {dominantEmotion}
        </div>
      )}
      {isAnalyzing && (
        <div className="analyzing-message">Analyzing emotion...</div>
      )}
      {error && <div className="error-message">Error: {error}</div>}
    </div>
  );
}

export default Camera;
