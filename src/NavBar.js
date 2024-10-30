// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav style={styles.nav}>
            <h1 style={styles.title}>User Management App</h1>
            <div style={styles.links}>
                <Link to="/" style={styles.link}>Home</Link>
                <Link to="/users" style={styles.link}>User Management</Link>
                <Link to="/products" style={styles.link}>Product Management</Link>
                <Link to="/signup" style={styles.link}>Sign Up</Link>
                <Link to="/" style={styles.link}>Log In</Link>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: '#2980b9',
        padding: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        color: '#ecf0f1',
        width: '100%',
    },
    title: {
        margin: 0,
        fontSize: '24px',
    },
    links: {
        display: 'flex',
        gap: '15px',
    },
    link: {
        color: '#ecf0f1',
        textDecoration: 'none',
        padding: '8px 15px',
        borderRadius: '4px',
        transition: 'background-color 0.3s',
    },
};

export default NavBar;