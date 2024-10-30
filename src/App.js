// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import Signup from './SignUp';
import Login from './Login';
import Dashboard from './Dashboard';
import UserManager from './UserManager';
import ProductManager from './ProductManager';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData); // Simulate user login
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <Router>
            <div style={styles.appContainer}>
                <NavBar />
                <Routes>
                    <Route path="/" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
                    <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
                    <Route path="/dashboard" element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Login onLogin={handleLogin} />} />
                    <Route path="/users" element={user ? <UserManager /> : <Login onLogin={handleLogin} />} />
                    <Route path="/products" element={user ? <ProductManager /> : <Login onLogin={handleLogin} />} />
                </Routes>
            </div>
        </Router>
    );
};

const styles = {
    appContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#ecf0f1',
        fontFamily: 'Arial, sans-serif',
    },
};

export default App;