"use client";

import React, { useEffect, useState } from 'react';
import fetchItems from '../api/fetchProducts';

const ProductList = () => {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getItems = async () => {
            const items = await fetchItems();
            setItems(items);
        };
        getItems();
    }, []);

    return (
        <div style={styles.productList}>
            {items.length === 0 ? (
                <p>Loading...</p>
            ) : (
                items.map((item) => (
                    <div key={item.id} style={styles.product}>
                        <img src={item.image} alt={item.name} style={styles.image} />
                        <p><strong>{item.name}</strong></p>
                        <p>${item.price} {item.currency}</p>
                        <p>{item.reviews} reviews</p>
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    productList: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        padding: '1rem'
    },
    product: {
        border: '1px solid #e0e0e0',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center',
        width: 'calc(33.333% - 2rem)',
        backgroundColor: '#fff',
    },
    image: {
        width: '100%',
        height: 'auto',
        marginBottom: '1rem'
    }
};

export default ProductList;
