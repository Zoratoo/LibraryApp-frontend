import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home.jsx';
import Books from './screens/Books.jsx';
import Clients from './screens/Clients.jsx';
import "./index.css"; 
 
function App() { 
  return ( 
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/clients' element={<Clients />} />
      </Routes>
    </div>
  ); 
} 
 
export default App; 