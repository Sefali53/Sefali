// src/components/ProductManager.js
import React, { useState } from 'react';
import ProductForm from './ProductForm'; // Ensure this component exists
import Login from './Login';
import Signup from './SignUp';

const ProductManager = () => {
    const [products, setProducts] = useState([]);
    const [editingIndex, setEditingIndex] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSigningUp, setIsSigningUp] = useState(false);

    const addProduct = (newProduct) => {
        setProducts([...products, newProduct]);
    };

    const editProduct = (updatedProduct) => {
        const updatedProducts = products.map((product, index) =>
            index === editingIndex ? updatedProduct : product
        );
        setProducts(updatedProducts);
        setEditingIndex(null);
    };

    const deleteProduct = (index) => {
        const updatedProducts = products.filter((_, i) => i !== index);
        setProducts(updatedProducts);
    };

    const sellProduct = (index) => {
        const product = products[index];
        const quantityToSell = prompt(`How many ${product.name} would you like to sell? (Available: ${product.quantity})`);

        if (quantityToSell) {
            const quantity = parseInt(quantityToSell);
            if (isNaN(quantity) || quantity <= 0) {
                alert("Please enter a valid quantity.");
                return;
            }
            if (quantity > product.quantity) {
                alert("You cannot sell more than the available quantity.");
                return;
            }

            const updatedProducts = [...products];
            updatedProducts[index].quantity -= quantity;

            if (updatedProducts[index].quantity === 0) {
                updatedProducts.splice(index, 1);
            }

            setProducts(updatedProducts);
            alert(`Sold ${quantity} of ${product.name}.`);
        }
    };

    const handleSignup = (username, password) => {
        alert(`User ${username} has signed up!`);
        setIsSigningUp(false);
        setIsLoggedIn(true);
    };

    return (
        <div style={styles.container}>
            {!isLoggedIn ? (
                isSigningUp ? (
                    <Signup onSignup={handleSignup} />
                ) : (
                    <Login onLogin={setIsLoggedIn} />
                )
            ) : (
                <>
                    <h2>Product Manager</h2>
                    <ProductForm
                        onAddProduct={editingIndex === null ? addProduct : editProduct}
                        editingProduct={editingIndex !== null ? products[editingIndex] : null}
                        setEditingIndex={setEditingIndex}
                    />
                    <h3>Product List</h3>
                    {products.length === 0 ? (
                        <p>No products available. Please add some.</p>
                    ) : (
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.tableHeader}>Name</th>
                                    <th style={styles.tableHeader}>Category</th>
                                    <th style={styles.tableHeader}>Price (M)</th>
                                    <th style={styles.tableHeader}>Quantity</th>
                                    <th style={styles.tableHeader}>Description</th>
                                    <th style={styles.tableHeader}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={index} style={styles.tableRow}>
                                        <td>{product.name}</td>
                                        <td>{product.category}</td>
                                        <td>{(product.price / 1000000).toFixed(2)}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.description}</td>
                                        <td>
                                            <button onClick={() => setEditingIndex(index)} style={styles.editButton}>Edit</button>
                                            <button onClick={() => sellProduct(index)} style={styles.sellButton}>Sell</button>
                                            <button onClick={() => deleteProduct(index)} style={styles.deleteButton}>Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                    <button onClick={() => setIsSigningUp(true)} style={styles.signupButton}>Sign Up</button>
                </>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        backgroundColor: '#ecf0f1',
        borderRadius: '8px',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '20px',
    },
    tableHeader: {
        backgroundColor: '#27ae60',
        color: '#ecf0f1',
        padding: '10px',
        textAlign: 'left',
    },
    tableRow: {
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #bdc3c7',
    },
    editButton: {
        backgroundColor: '#f39c12',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
    },
    sellButton: {
        backgroundColor: '#2980b9',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px',
    },
    deleteButton: {
        backgroundColor: '#c0392b',
        color: 'white',
        border: 'none',
        padding: '5px 10px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
    signupButton: {
        marginTop: '20px',
        backgroundColor: '#27ae60',
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
    },
};

export default ProductManager;