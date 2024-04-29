import React, { useRef, useEffect, useState } from "react";

function Camera() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error accessing the camera:", err);
        setError(
          "Failed to access the camera. Please ensure the camera is working and the site has permission to access it."
        );
      });
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
        if (data.dominant_emotion) {
          console.log("Dominant Emotion:", data.dominant_emotion);
          // Log only specified emotions
          const filteredEmotions = Object.keys(data.emotions)
            .filter((key) =>
              ["angry", "sad", "neutral", "happy", "surprise"].includes(key)
            )
            .reduce((obj, key) => {
              obj[key] = data.emotions[key];
              return obj;
            }, {});
          console.log("Filtered Emotions:", filteredEmotions);
        }
      } catch (error) {
        console.error("", error);
        setError("");
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      captureImage();
    }, 5000); // capture image. 1 is 1 milliseconds. 1000 is 1 second.

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        width="640"
        height="480"
      ></video>
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default Camera;
