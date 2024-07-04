import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import About from './components/About';
import History from './components/History';
import Statistics from './components/Statistics';
import './App.css';

export const AuthContext = createContext();

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
                    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
                    <Route path="/history" element={isAuthenticated ? <History /> : <Navigate to="/login" />} />
                    <Route path="/statistics" element={isAuthenticated ? <Statistics /> : <Navigate to="/login" />} />
                </Routes>
            </Router>
        </AuthContext.Provider>
    );
};

export default App;
