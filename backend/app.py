from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import numpy as np
import cv2
from deepface import DeepFace
import logging
from flask_cors import CORS
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
cors_options = {
    "origins": ["http://localhost:3000"],
    "methods": ["GET", "POST", "PUT", "DELETE"],
    "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"]
}
CORS(app, resources={r"/*": cors_options})

# Database configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Flannel2024@localhost/flannel'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)

# Models
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256))
    name = db.Column(db.String(120), nullable=False)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Emotion(db.Model):
    __tablename__="emotion_data"
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String)
    emotion = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    emotion_type = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f"<EmotionData(emotion='{self.emotion}', image_url ='{self.image_url}')>"
# Logging configuration
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s - %(levelname)s - %(message)s')

# User registration endpoint
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    name = data.get('name')
    user = User.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({"error": "User already exists"}), 409
    
    new_user = User(email=data['email'], name = name)
    new_user.set_password(data['password'])
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"message": "User successfully registered"}), 201

# User login endpoint
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()
    
    if user and user.check_password(data['password']):
        return jsonify({"message": "Login successful", "user_id": user.id}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401

# Emotion analysis endpoint
@app.route('/analyze', methods=['POST'])
def analyze():
    if 'image' not in request.files:
        app.logger.info('No image file found in the request')
        return jsonify({"error": "No image file found"}), 400

    file = request.files['image']
    npimg = np.frombuffer(file.read(), np.uint8)
    img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)

    if img is None:
        app.logger.info('Could not decode image.')
        return jsonify({"error": "Could not decode image"}), 400

    results = DeepFace.analyze(img, actions=['emotion'], enforce_detection=False)

    if not results:
        app.logger.info('No results from DeepFace.')
        return jsonify({"error": "No results returned"}), 500

    emotions = results[0]['emotion']  # Access the first element of the results list
    dominant_emotion = max(emotions, key=emotions.get)

    user_id = request.args.get('user_id')
    if user_id:
        new_emotion = Emotion(user_id=int(user_id), emotion_type=dominant_emotion, value=emotions[dominant_emotion])
        db.session.add(new_emotion)
        db.session.commit()

    return jsonify({"dominant_emotion": dominant_emotion, "emotions": emotions}), 200

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)