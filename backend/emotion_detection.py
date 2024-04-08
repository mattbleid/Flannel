from deepface import DeepFace

def detect_emotions(frame):
    try:
        emotions = DeepFace.analyze(frame, actions=['emotion'], enforce_detection=False)
        dominant_emotion = emotions[0]['dominant_emotion']
        emotion_scores = emotions[0]['emotion']
        return dominant_emotion, emotion_scores
    except Exception as e:
        print(f"Error during emotion detection: {str(e)}")
        return None, None