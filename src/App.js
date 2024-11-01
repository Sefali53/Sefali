// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const App = () => {
    const [products, setProducts] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('user'); // Default role
    const [product, setProduct] = useState({ name: '', category: '', price: '', quantity: '', description: '' });
    const [sellQuantity, setSellQuantity] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');

    const addProduct = () => {
        if (editingIndex !== null) {
            const updatedProducts = products.map((p, index) => (index === editingIndex ? product : p));
            setProducts(updatedProducts);
            setEditingIndex(null);
        } else {
            setProducts([...products, { ...product, price: parseFloat(product.price) * 1000000 }]);
        }
        setProduct({ name: '', category: '', price: '', quantity: '', description: '' });
    };

    const deleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const sellProduct = (index) => {
        if (products[index].quantity >= sellQuantity) {
            const updatedProducts = [...products];
            updatedProducts[index].quantity -= sellQuantity; // Update quantity
            setProducts(updatedProducts);
            alert(`Sold ${sellQuantity} units of ${products[index].name}.`);
        } else {
            alert(`Not enough quantity available for ${products[index].name}.`);
        }
    };

    const handleSignup = (e) => {
        e.preventDefault();
        if (users.some(user => user.username === username)) {
            alert('Username already exists. Please choose another one.');
            return;
        }
        setUsers([...users, { username, password, role: userRole }]);
        alert(`User ${username} has signed up!`);
        setIsSigningUp(false);
        resetAuthFields();
    };

    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            setIsLoggedIn(true);
            alert(`Welcome back, ${username}!`);
        } else {
            alert('Invalid credentials. User not found or password is incorrect.');
        }
    };

    const resetAuthFields = () => {
        setUsername('');
        setPassword('');
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteUser = (usernameToDelete) => {
        const updatedUsers = users.filter(user => user.username !== usernameToDelete);
        setUsers(updatedUsers);
        alert(`Deleted user ${usernameToDelete}.`);
    };

    return (
        <Router>
            <div style={styles.container}>
                <h1 style={styles.title}>Product Management App</h1>
                <nav style={styles.nav}>
                    <Link to="/" style={styles.navLink}>Dashboard</Link>
                    {isLoggedIn && <Link to="/products" style={styles.navLink}>Manage Products</Link>}
                    {isLoggedIn && users.some(user => user.role === 'admin') && <Link to="/users" style={styles.navLink}>User Manager</Link>}
                </nav>
                <Routes>
                    <Route path="/" element={
                        !isLoggedIn ? (
                            isSigningUp ? (
                                <form onSubmit={handleSignup} style={styles.authForm}>
                                    <h2 style={styles.formTitle}>Sign Up</h2>
                                    <input style={styles.input} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    <input style={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <select style={styles.input} value={userRole} onChange={(e) => setUserRole(e.target.value)}>
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                    <button style={styles.button} type="submit">Sign Up</button>
                                    <button style={styles.switchButton} type="button" onClick={() => setIsSigningUp(false)}>Already have an account? Login</button>
                                </form>
                            ) : (
                                <form onSubmit={handleLogin} style={styles.authForm}>
                                    <h2 style={styles.formTitle}>Login</h2>
                                    <input style={styles.input} type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    <input style={styles.input} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    <button style={styles.button} type="submit">Login</button>
                                    <button style={styles.switchButton} type="button" onClick={() => setIsSigningUp(true)}>Sign Up</button>
                                </form>
                            )
                        ) : (
                            <div style={styles.dashboard}>
                                <h2 style={styles.dashboardTitle}>Dashboard</h2>
                                <div style={styles.dashboardItem}><strong>Total Products:</strong> {products.length}</div>
                                <div style={styles.dashboardItem}><strong>Total Users:</strong> {users.length}</div>
                            </div>
                        )
                    } />
                    <Route path="/products" element={
                        isLoggedIn ? (
                            <>
                                <h2 style={styles.sectionTitle}>Manage Products</h2>
                                <form onSubmit={(e) => { e.preventDefault(); addProduct(); }}>
                                    <input style={styles.input} type="text" placeholder="Name" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} required />
                                    <input style={styles.input} type="text" placeholder="Category" value={product.category} onChange={(e) => setProduct({ ...product, category: e.target.value })} required />
                                    <input style={styles.input} type="number" placeholder="Price (in M)" value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })} required />
                                    <input style={styles.input} type="number" placeholder="Quantity" value={product.quantity} onChange={(e) => setProduct({ ...product, quantity: e.target.value })} required />
                                    <textarea style={styles.textarea} placeholder="Description" value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })}></textarea>
                                    <button style={styles.button} type="submit">{editingIndex !== null ? 'Update Product' : 'Add Product'}</button>
                                </form>
                                <input 
                                    type="text" 
                                    placeholder="Search Products..." 
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={styles.searchInput}
                                />
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Category</th>
                                            <th>Price (M)</th>
                                            <th>Quantity</th>
                                            <th>Description</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredProducts.map((p, index) => (
                                            <tr key={index}>
                                                <td>{p.name}</td>
                                                <td>{p.category}</td>
                                                <td>{(p.price / 1000000).toFixed(2)}</td>
                                                <td>{p.quantity}</td>
                                                <td>{p.description}</td>
                                                <td style={styles.actionCell}>
                                                    <button style={styles.actionButton} onClick={() => { setProduct(p); setEditingIndex(index); }}>Edit</button>
                                                    <button style={styles.actionButton} onClick={() => deleteProduct(index)}>Delete</button>
                                                    <input 
                                                        type="number" 
                                                        min="1" 
                                                        value={sellQuantity} 
                                                        onChange={(e) => setSellQuantity(parseInt(e.target.value))} 
                                                        style={styles.sellInput} 
                                                    />
                                                    <button style={styles.actionButton} onClick={() => sellProduct(index)}>Sell</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </>
                        ) : (
                            <h2>Please log in to manage products.</h2>
                        )
                    } />
                    <Route path="/users" element={
                        isLoggedIn && users.some(user => user.role === 'admin') ? (
                            <>
                                <h2 style={styles.sectionTitle}>User Manager</h2>
                                <div style={styles.usersContainer}>
                                    {users.map((user, index) => (
                                        <div key={index} style={styles.userCard}>
                                            <h4 style={styles.userTitle}>{user.username} ({user.role})</h4>
                                            <button style={styles.deleteButton} onClick={() => deleteUser(user.username)}>Delete User</button>
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <h2>You do not have permission to access this page.</h2>
                        )
                    } />
                </Routes>
            </div>
        </Router>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        background: 'linear-gradient(to right, #6a11cb, #2575fc)',
        color: '#fff',
        margin: 0,
        padding: '20px',
        maxWidth: '900px',
        margin: 'auto',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
    },
    title: {
        textAlign: 'center',
        color: '#fff',
    },
    nav: {
        display: 'flex',
        justifyContent: 'space-around',
        marginBottom: '20px',
    },
    navLink: {
        textDecoration: 'none',
        color: '#fff',
        fontWeight: 'bold',
        padding: '10px',
        borderRadius: '5px',
        transition: 'background 0.3s',
    },
    authForm: {
        display: 'flex',
        flexDirection: 'column',
        marginBottom: '20px',
        background: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        color: '#343a40',
    },
    formTitle: {
        color: '#007bff',
    },
    input: {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
    },
    button: {
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: 'white',
        marginTop: '10px',
        transition: 'background 0.3s, transform 0.3s',
    },
    switchButton: {
        padding: '10px',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#28a745',
        color: 'white',
        marginTop: '10px',
        transition: 'background 0.3s',
    },
    dashboard: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '20px',
        padding: '20px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        backgroundColor: '#f1f3f5',
        color: '#343a40',
    },
    dashboardTitle: {
        color: '#007bff',
    },
    sectionTitle: {
        color: '#007bff',
    },
    textarea: {
        margin: '10px 0',
        padding: '10px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        resize: 'none',
    },
    searchInput: {
        width: '100%',
        padding: '10px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        marginBottom: '20px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#007bff',
        color: 'white',
    },
    tableCell: {
        border: '1px solid #ced4da',
        padding: '10px',
    },
    actionCell: {
        display: 'flex',
        alignItems: 'center',
    },
    productsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '20px',
    },
    productCard: {
        border: '1px solid #ced4da',
        borderRadius: '8px',
        padding: '15px',
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.2s',
    },
    productTitle: {
        color: '#007bff',
    },
    productActions: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '10px',
    },
    actionButton: {
        backgroundColor: '#ffc107',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
        transition: 'background 0.3s, transform 0.3s',
    },
    sellInput: {
        width: '60px',
        margin: '0 5px',
        padding: '5px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
    },
    usersContainer: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '20px',
    },
    userCard: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        marginBottom: '10px',
        backgroundColor: '#ffffff',
    },
    userTitle: {
        color: '#007bff',
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default App;
