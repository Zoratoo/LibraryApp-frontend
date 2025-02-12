import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './screens/Home.jsx';
import Books from './screens/book/Books.jsx';
import Clients from './screens/client/Clients.jsx';
import Rentals from './screens/rental/Rentals.jsx';
import ClientForm from './screens/client/client-form.jsx';
import "./index.css";
import BookForm from './screens/book/book-form.jsx';

import { NavbarProvider } from './templates/navbar/NavbarContext.js';


function App() {
  return (
    <div className="App">
      <NavbarProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/books' element={<Books />} />
          <Route path='/clients' element={<Clients />} />
          <Route path='/rentals' element={<Rentals />} />

          <Route path='/books/form' element={<BookForm />} />
          <Route path='/clients/form' element={<ClientForm />} />
        </Routes>
      </NavbarProvider>
    </div>
  );
}

export default App; 