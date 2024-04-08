from flask import Flask
from flask_socketio import SocketIO, emit
from emotion_detection import detect_emotions

app = Flask(__name__)
socketio = SocketIO(app)

@socketio.on('connect')
def handle_connect():
    print('Client connected')

@socketio.on('disconnect')
def handle_disconnect():
    print('Client disconnected')

@socketio.on('frame')
def handle_frame(data):
    frame_data = data['frame']
    dominant_emotion, emotion_scores = detect_emotions(frame_data)
    emit('emotions', {'dominant_emotion': dominant_emotion, 'emotion_scores': emotion_scores})

if __name__ == '__main__':
    socketio.run(app)