import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen.jsx';
import Books from './screens/Books.jsx';
import "./index.css"; 
 
function App() { 
  return ( 
    <div className="App">
      <Routes>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/books' element={<Books />} />
      </Routes>
    </div>
  ); 
} 
 
export default App; 