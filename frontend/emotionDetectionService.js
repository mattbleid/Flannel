/// Doug will work on this on Thursday
import * as faceapi from "face-api.js";

async function loadModels() {
  await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
  await faceapi.nets.faceExpressionNet.loadFromUri("/models");
}

async function detectEmotions(video) {
  await loadModels();

  const detections = await faceapi
    .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions();

  if (detections.length > 0) {
    const expressions = detections[0].expressions;
    const dominantEmotion = Object.keys(expressions).reduce((a, b) =>
      expressions[a] > expressions[b] ? a : b
    );

    return {
      dominant: dominantEmotion,
      expressions: expressions,
    };
  }

  return null;
}

export { detectEmotions };
