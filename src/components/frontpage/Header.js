// export default Header;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate("/"); // Redirect to the home page
  };

  return (
    <header>
      <nav>
        <ul className="nav-left">
          <li>
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated && (
            <>
              <li>
                <Link to="/history">History</Link>
              </li>
              <li>
                <Link to="/invoices">Invoices</Link>
              </li>
            </>
          )}
        </ul>
        <ul className="nav-right">
          {!isAuthenticated ? (
            <li>
              <Link to="/login" className="login-button">
                Login
              </Link>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout} className="logout-button">
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
