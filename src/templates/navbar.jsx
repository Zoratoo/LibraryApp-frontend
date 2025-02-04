import React from "react";
import { Link } from "react-router-dom";
import '../css/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navibar = () => {
  return (
    <div className="d-flex flex-column vh-100" style={{ width: '250px', backgroundColor: '#343a40', color: 'white' }}>
      <div className="p-4 fs-4 fw-bold border-bottom" style={{ borderColor: '#495057', boxShadow: '0 2px 4px rgba(255, 255, 255, 0.2)' }}>
        <Link to="/" className="text-white text-decoration-none" style={{ fontFamily: 'Poppins, sans-serif' }}>
          📚 LIBRARY
        </Link>
      </div>
      <nav className="flex-fill mt-4">
        <ul className="list-unstyled">
          <li className="p-2">
            <Link to="/" className="nav-link">
              <div className="text-white text-decoration-none hover-underline">
                🏠 Home
              </div>
            </Link>
          </li>
          <li className="p-2">
            <Link to="/books" className="nav-link">
              <div className="text-white text-decoration-none hover-underline">
                📖 Books
              </div>
            </Link>
          </li>
          <li className="p-2">
            <Link to="/clients" className="nav-link">
              <div className="text-white text-decoration-none hover-underline">
                👥 Clients
              </div>
            </Link>
          </li>
          <li className="p-2">
            <Link to="/rentals" className="nav-link">
              <div className="text-white text-decoration-none hover-underline">
                📦 Rentals
              </div>
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-top" style={{ borderColor: '#495057' }}>
        <a href="#logout" className="text-white text-decoration-none hover-underline">🚪 Logout</a>
      </div>
    </div>
  );
};

export default Navibar;
