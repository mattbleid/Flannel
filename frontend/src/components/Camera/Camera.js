import React, { useRef, useEffect, useState } from "react";

function Camera() {
  const videoRef = useRef(null);
  const [error, setError] = useState("");
  const [emotion, setEmotion] = useState("");
  //const [imageSrc, setImageSrc] = useState("");

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
    //const imageUrl = canvas.toDataURL();
    //setImageSrc(imageUrl);

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
          setEmotion(data.dominant_emotion);

          //send data to backend
          const postData = {
            emotion: data.dominant_emotion,
            //image_url: imageURL
          }

          fetch("http://localhost:5001/save_emotion", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          });
          //backend sent
          if (data.dominant_emotion == "angry") {
            window.alert("You appear to be angry, take a deep breath and relax your muscles!!")
          }
          if (data.dominat_emotion == "sad") {
            window.alert("It seems you are sad. Lets turn that frown upside down!")
          }
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
        setError("Failed to analyze emotion.");
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
      {emotion && <div>Emotion: {emotion}</div>}
    </div>
  );
}

export default Camera;
