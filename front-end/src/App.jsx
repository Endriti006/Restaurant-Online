import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages';
import Login from './components/Login&Register/Login'; // Example of a login component
import AboutUs from './pages/aboutUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;