// src/components/Signup.js
import React, { useState } from 'react';

const Signup = ({ onSignup }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            onSignup(username, password); // Call the function passed as prop
            clearFields();
        } else {
            alert('Please fill in both fields.');
        }
    };

    const clearFields = () => {
        setUsername('');
        setPassword('');
    };

    return (
        <form onSubmit={handleSubmit} style={styles.form}>
            <h2>Sign Up</h2>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} style={styles.input} required />
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
            <button type="submit" style={styles.button}>Sign Up</button>
        </form>
    );
};

const styles = {
    form: {
        backgroundColor: '#27ae60',
        padding: '20px',
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        width: '300px',
        margin: '10px',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #bdc3c7',
    },
    button: {
        backgroundColor: '#2980b9',
        color: '#fff',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default Signup;