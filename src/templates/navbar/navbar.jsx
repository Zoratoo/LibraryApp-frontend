import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useNavbar } from './NavbarContext.js';
import '../../css/dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  const { expanded, setExpanded } = useNavbar();

  return (
    <div
      className="d-flex flex-column vh-100 position-relative"
      style={{
        width: expanded ? '250px' : '80px',
        backgroundColor: '#0B132B',
        color: 'white',
        borderRadius: '0 10px 10px 0',
        transition: 'width 0.3s ease-in-out',
        fontFamily: 'Poppins, sans-serif'
      }}
    >
      <button
        className="btn btn-outline-light position-absolute"
        style={{
          top: '10px',
          right: '-15px',
          width: '30px',
          height: '30px',
          borderRadius: '50%',
          backgroundColor: '#1E3A8A',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
      </button>

      <div className="p-4 fs-5 fw-bold border-bottom text-truncate">
        <Link to="/" className="text-white text-decoration-none">
          📚 {expanded && "LIBRARY"}
        </Link>
      </div>

      <nav className="flex-fill mt-4">
        <ul className="list-unstyled">
          <li className="p-2">
            <Link to="/" className="nav-link text-white d-flex align-items-center">
              <div className="hover-underline">
                🏠 {expanded && <span className="ms-2">Home</span>}
              </div>
            </Link>
          </li>
          <li className="p-2">
            <Link to="/books" className="nav-link text-white d-flex align-items-center">
              <div className="hover-underline">
                📖 {expanded && <span className="ms-2">Books</span>}
              </div>
            </Link>
          </li>
          <li className="p-2">
            <Link to="/clients" className="nav-link text-white d-flex align-items-center">
              <div className="hover-underline">
                👥 {expanded && <span className="ms-2">Clients</span>}
              </div>
            </Link>
          </li>
          <li className="p-2">
            <Link to="/rentals" className="nav-link text-white d-flex align-items-center">
              <div className="hover-underline">
                📦 {expanded && <span className="ms-2">Rentals</span>}
              </div>
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-top text-truncate">
        <a href="#logout" className="text-white text-decoration-none">
          <div className="hover-underline">
            🚪 {expanded && "Logout"}
          </div>
        </a>
      </div>
    </div>
  );
};

export default Navbar;
