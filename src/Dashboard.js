// src/components/Dashboard.js
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = ({ user, onLogout }) => {
    return (
        <div style={styles.dashboard}>
            <h1>Welcome, {user.username}!</h1>
            <button onClick={onLogout} style={styles.logoutButton}>Log Out</button>
            <nav style={styles.nav}>
                <Link to="/users" style={styles.navLink}>User Management</Link>
                <Link to="/products" style={styles.navLink}>Product Management</Link>
            </nav>
            <h2>Your Dashboard</h2>
            <p>Manage your account and view your statistics here.</p>
        </div>
    );
};

const styles = {
    dashboard: {
        padding: '20px',
        backgroundColor: '#2c3e50',
        color: '#ecf0f1',
        borderRadius: '8px',
        width: '80%',
        margin: '20px auto',
    },
    logoutButton: {
        backgroundColor: '#c0392b',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    nav: {
        margin: '20px 0',
    },
    navLink: {
        color: '#ecf0f1',
        margin: '0 15px',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default Dashboard;