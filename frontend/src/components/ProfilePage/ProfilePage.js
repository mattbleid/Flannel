import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProfilePage = () => {

    const navigate = useNavigate;
    const [user, setUser] = useState({
        name: "",
        email: "",
        bio: "",

    });


    useEffect(() => {
        // Fetch user data from an API or perform any other side effect
        const fetchUserData = async () => {
            try {
                const response = await fetch("http://localhost:5001/user/profile", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    // You may need to send some authentication token or session information here
                });
                const userData = await response.json();
                if (response.ok) {
                    setUser(userData);
                } else {
                    // Handle error
                    console.error("Failed to fetch user data");
                }
            } catch (err) {
                // Handle error
                console.error("Failed to connect to the server.", err);
            }
        };

        fetchUserData();

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
            <h1>Welcome to Your Flannel Profile!</h1>
            <div>
                <h2>Personal Information</h2>
                <p><strong>Name:</strong> {user.name}</p>
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Bio:</strong> {user.bio}</p>
                {/* Add more user information fields here */}
            </div>
        </div>
    );
};

export default ProfilePage;