import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Nav = styled.nav`
  background-color: #f8f9fa;
  padding: 10px 20px;
  position: ${(props) => (props.isSticky ? "fixed" : "static")};
  top: 0;
  width: 100%;
  box-shadow: ${(props) =>
    props.isSticky ? "0 2px 4px rgba(0,0,0,0.1)" : "none"};
  transition: box-shadow 0.3s ease-in-out;
`;

const NavIcon = styled.span`
  --bs-icon-size: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--bs-icon-size);
  width: calc(var(--bs-icon-size) * 2);
  height: calc(var(--bs-icon-size) * 2);
  color: var(--bs-primary);
  background: var(--bs-primary-bg-subtle);
  border-radius: 50%;
  margin-right: 5px;
`;

const StyledLink = styled(Link)`
  color: #333;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;

  &:hover {
    text-decoration: underline;
  }
`;

const NavigationBar = () => {
  const [isSticky, setSticky] = useState(false);
  const [isSmallScreen, setSmallScreen] = useState(false);

  const handleScroll = () => {
    setSticky(window.scrollY > 0);
  };

  const handleResize = () => {
    setSmallScreen(window.innerWidth <= 600);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize)
    }
  }, []);

  return (
    <Nav isSticky={isSticky} className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto flex-nowrap">
            <li className="nav-item">
              <StyledLink to="/" className="nav-link">
                <NavIcon />
                Home
              </StyledLink>
            </li>
          </ul>
        </div>
      </div>
    </Nav>
  );
};

export default NavigationBar;
