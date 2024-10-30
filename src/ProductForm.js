// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';

const ProductForm = ({ onAddProduct, editingProduct, setEditingIndex }) => {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (editingProduct) {
            setName(editingProduct.name);
            setCategory(editingProduct.category);
            setPrice((editingProduct.price / 1000000).toString());
            setQuantity(editingProduct.quantity);
            setDescription(editingProduct.description);
        } else {
            clearFields();
        }
    }, [editingProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name || !category || !price || !quantity || !description) {
            alert("Please fill in all fields");
            return;
        }
        const product = { 
            name, 
            category, 
            price: parseFloat(price) * 1000000, 
            quantity: parseInt(quantity), 
            description 
        };
        onAddProduct(product);
        clearFields();
    };

    const clearFields = () => {
        setName('');
        setCategory('');
        setPrice('');
        setQuantity('');
        setDescription('');
    };

    const styles = {
        formContainer: {
            margin: '20px',
            padding: '20px',
            backgroundColor: '#27ae60',
            borderRadius: '8px',
        },
        heading: {
            color: '#ecf0f1',
        },
        formInput: {
            width: '100%',
            padding: '10px',
            margin: '10px 0',
            borderRadius: '4px',
            border: '1px solid #bdc3c7',
        },
        formButton: {
            backgroundColor: '#2980b9',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: 'pointer',
        },
    };

    return (
        <form onSubmit={handleSubmit} style={styles.formContainer}>
            <h3 style={styles.heading}>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
            <input 
                type="text" 
                placeholder="Product Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                style={styles.formInput} 
            />
            <input 
                type="text" 
                placeholder="Category" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                style={styles.formInput} 
            />
            <div style={styles.priceContainer}>
                <span style={styles.currencySymbol}></span>
                <input 
                    type="number" 
                    placeholder="Price" 
                    value={price} 
                    onChange={(e) => setPrice(e.target.value)} 
                    style={styles.formInput} 
                />
            </div>
            <input 
                type="number" 
                placeholder="Quantity" 
                value={quantity} 
                onChange={(e) => setQuantity(e.target.value)} 
                style={styles.formInput} 
            />
            <input 
                type="text" 
                placeholder="Description" 
                value={description} 
                onChange={(e) => setDescription(e.target.value)} 
                style={styles.formInput} 
            />
            <button type="submit" style={styles.formButton}>{editingProduct ? 'Update Product' : 'Add Product'}</button>
        </form>
    );
};

export default ProductForm;