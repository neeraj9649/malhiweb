import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact Info</Link></li>
          <li><Link to="/invoices">Invoices</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
