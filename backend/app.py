from flask import Flask
from flask_socketio import SocketIO
from socket_io import socketio

app = Flask(__name__)
socketio.init_app(app)

# Doug needs to add configuration for the app here

if __name__ == '__main__':
    socketio.run(app)