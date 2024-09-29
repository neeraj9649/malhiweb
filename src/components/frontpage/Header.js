// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Header({ isLoggedIn, onLogin }) {
//   const [password, setPassword] = useState('');
//   const correctPassword = '111'; // Replace 'yourPassword' with the actual password

//   const handleLogin = () => {
//     // Prompt for password
//     const enteredPassword = prompt("Please enter your password:");

//     // Check if the password is correct
//     if (enteredPassword === correctPassword) {
//       onLogin(); // Call the onLogin function if the password is correct
//     } else {
//       alert("Incorrect password. Please try again."); // Alert if the password is incorrect
//     }
//   };

//   return (
//     <header>
//       <nav>
//         <ul className="nav-links">
//           {/* Home button always visible */}
//           <li>
//             <Link to="/">Home</Link>
//           </li>

//           {/* Show Invoices and History only after login */}
//           {isLoggedIn && (
//             <>
//               <li><Link to="/invoices">Invoices</Link></li>
//               <li><Link to="/3456478765432">History</Link></li>
//             </>
//           )}
//         </ul>
//         {/* Login button at the far right */}
//         <div>
//           <button className="login-button" onClick={handleLogin}>Login</button>
//         </div>
//       </nav>
//     </header>
//   );
// }

// export default Header;




// complete working
// ---
// import React from 'react';
// import { Link } from 'react-router-dom';

// function Header() {
//   return (
//     <header>
//       <nav>
//         <ul>
//           <li><Link to="/">Home</Link></li>
//           <li><Link to="/invoices">Invoices</Link></li>
//           <li><Link to="/history">History</Link></li>
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogout = () => {
    logout(); // Call the logout function
    navigate('/'); // Redirect to the home page
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
              <Link to="/login" className="login-button">Login</Link>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout} className="logout-button">Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
