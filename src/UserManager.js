// src/components/UserManager.js
import React, { useState } from 'react';

const UserManager = () => {
    const [users, setUsers] = useState([{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }]);
    const [newUser, setNewUser] = useState('');

    const addUser = () => {
        if (newUser) {
            setUsers([...users, { id: users.length + 1, username: newUser }]);
            setNewUser('');
        }
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    return (
        <div style={styles.container}>
            <h2>User Management</h2>
            <input type="text" placeholder="New Username" value={newUser} onChange={(e) => setNewUser(e.target.value)} style={styles.input} />
            <button onClick={addUser} style={styles.button}>Add User</button>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>
                                <button onClick={() => deleteUser(user.id)} style={styles.buttonDelete}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#34495e',
        color: '#ecf0f1',
        borderRadius: '8px',
        width: '80%',
        margin: '20px auto',
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
    buttonDelete: {
        backgroundColor: '#c0392b',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
};

export default UserManager;