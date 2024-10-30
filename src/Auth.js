import React, { useState } from 'react';

const authContainerStyle = {
    backgroundColor: 'white',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'center',
};

const inputStyle = {
    width: '100%',
    padding: '10px',
    margin: '10px 0',
    border: '1px solid #ddd',
    borderRadius: '4px',
};

const buttonStyle = {
    backgroundColor: '#4facfe',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
};

const Auth = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    const handleLogin = () => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            onLogin();
        } else {
            alert("Invalid username or password.");
        }
    };

    const handleSignUp = () => {
        if (users.some(u => u.username === username)) {
            alert("Username already exists.");
        } else {
            setUsers([...users, { username, password }]);
            alert("Sign up successful. You can now log in.");
        }
    };

    return (
        <div style={authContainerStyle}>
            <h1 style={{ color: '#333' }}>Login / Sign Up</h1>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                style={inputStyle} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={inputStyle} 
            />
            <button onClick={handleLogin} style={buttonStyle}>Login</button>
            <button onClick={handleSignUp} style={buttonStyle}>Sign Up</button>
        </div>
    );
};

export default Auth;