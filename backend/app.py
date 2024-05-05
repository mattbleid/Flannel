from flask import Flask, request, jsonify
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from datetime import datetime, timedelta
import os
from deepface import DeepFace

# Flask setup
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Flannel2024@localhost/flannel'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# Simple secret key for demonstration purposes
app.config['JWT_SECRET_KEY'] = 'simple-demo-key'
# Extended token expiration for convenience
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=1)

# Database and JWT setup
db = SQLAlchemy(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

# CORS configuration
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, methods=["GET", "POST"], allow_headers=["Content-Type", "Authorization"])

# Define User model
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    name = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def check_password(self, password):
        return password == self.password

# Define Emotion model
class Emotion(db.Model):
    __tablename__ = "emotion_data"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    emotion_type = db.Column(db.String(50), nullable=False)
    value = db.Column(db.Float, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

# Register a new user
@app.route('/register', methods=['POST', 'OPTIONS'])
def register():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
        return response

    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400
    user = User.query.filter_by(email=email).first()
    if user:
        return jsonify({"error": "User already exists"}), 409
    new_user = User(email=email, name=name, password=password)
    db.session.add(new_user)
    db.session.commit()
    response = jsonify({"message": "User successfully registered"})
    response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
    return response, 201

@app.route('/login', methods=['POST', 'OPTIONS'])
def login():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
        return response

    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        token = create_access_token(identity=user.id)
        response = jsonify({'token': token})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,POST')
        return response
    else:
        return jsonify({'error': 'Invalid email or password'}), 401

@app.route('/analyze', methods=['POST', 'OPTIONS'])
@jwt_required()
def analyze_emotion():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        return response

    user_email = request.form.get('email')
    image_file = request.files.get('image')
    if not user_email or not image_file:
        return jsonify({"error": "Missing required fields"}), 400

    user = User.query.filter_by(email=user_email).first()
    if not user:
        return jsonify({"error": "User not found"}), 404

    image_path = 'temp_image.jpg'
    image_file.save(image_path)

    try:
        result = DeepFace.analyze(image_path, actions=['emotion'])
        if isinstance(result, dict):
            dominant_emotion = result['dominant_emotion']
            emotion_value = result['emotion'][dominant_emotion]
        else:
            return jsonify({"error": "Invalid analysis result"}), 500

        emotion_data = Emotion(
            user_id=user.id,
            emotion_type=dominant_emotion,
            value=emotion_value
        )
        db.session.add(emotion_data)
        db.session.commit()

        return jsonify({"dominant_emotion": dominant_emotion}), 200

    except Exception as e:
        print(f"DeepFace Analysis Error: {e}")
        return jsonify({"error": f"Failed to analyze emotion: {str(e)}"}), 500

    finally:
        if os.path.exists(image_path):
            os.remove(image_path)

@app.route('/user/profile', methods=['GET'])
@jwt_required()
def get_profile():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404

    latest_emotion = Emotion.query.filter_by(user_id=user_id).order_by(Emotion.timestamp.desc()).first()
    emotion_type = latest_emotion.emotion_type if latest_emotion else "Unknown"

    user_info = {
        'name': user.name,
        'email': user.email,
        'latest_emotion': emotion_type
    }
    return jsonify(user_info), 200

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5001)
