import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home.jsx';
import Books from './screens/book/Books.jsx';
import Clients from './screens/client/Clients.jsx';
import Rentals from './screens/rental/Rentals.jsx';
import ClientForm from './screens/client/client-form.jsx';
import "./index.css"; 
 
function App() { 
  return ( 
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books' element={<Books />} />
        <Route path='/clients' element={<Clients />} />
        <Route path='/rentals' element={<Rentals />} />
        <Route path='/clients/form' element={<ClientForm />} />
      </Routes>
    </div>
  ); 
} 
 
export default App; 