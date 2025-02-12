import React from 'react';
import { useNavbar } from './navbar/NavbarContext.js'; 
import Navbar from './navbar/navbar';

export default function Page(props) {
  const { expanded } = useNavbar();

  return (
    <div className="d-flex">
      <div style={{
        position: 'fixed',
        height: '100vh',
        transition: 'width 0.3s ease-in-out',
      }}>
        <Navbar />
      </div>

      <div className="pagina-content flex-grow-1"
        style={{
          marginLeft: expanded ? '250px' : '80px',
          transition: 'margin-left 0.3s ease-in-out',
          marginBottom: '50px'
        }}>
        {props.children}
      </div>
    </div>
  );
}
