import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {

    const navigate = useNavigate;
    const [user, setUser] = useState({
        name: "John Doe",
        email: "john@example.com",
        bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",

    });


    useEffect(() => {
        // Fetch user data from an API or perform any other side effect

    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light fixed-top">
                <div className="container">
                    <Link className="navbar-brand" to="/">
                        <span style={{ color: "rgb(207, 6, 6)" }}>Flannel</span>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavAltMarkup"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/home">
                                    Home
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <h1>Profile Page</h1>
            <div>
                <h2>User Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Bio:</strong> {user.bio}</p>
                {/* Add more user information fields here */}
            </div>
        </div>
    );
};

export default ProfilePage;