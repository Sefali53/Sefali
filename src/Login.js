// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            onLogin(username, password);
        } else {
            setError('Invalid credentials. Please enter a username and password.');
        }
    };

    return (
        <div style={styles.container}>
            <h2>Login</h2>
            {error && <p style={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={styles.input}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                    required
                />
                <button type="submit" style={styles.button}>Login</button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
        width: '300px',
        margin: 'auto',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        borderRadius: '4px',
        border: '1px solid #bdc3c7',
    },
    button: {
        backgroundColor: '#2980b9',
        color: 'white',
        border: 'none',
        padding: '10px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    error: {
        color: 'red',
    },
};

export default Login;