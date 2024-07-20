"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCategory } from '../contexts/CategoryContext';
import { useCart } from '../contexts/CartContext';
import fetchProducts from '../api/fetchProducts';

const ProductList = () => {
    const { selectedCategory, searchQuery } = useCategory();
    const { addToCart } = useCart();
    const [items, setItems] = useState([]);
    const [containerHeight, setContainerHeight] = useState(0);

    useEffect(() => {
        const getItems = async () => {
            const items = await fetchProducts(selectedCategory);
            setItems(items);
        };
        getItems();
    }, [selectedCategory]);

    useEffect(() => {
        const updateContainerHeight = () => {
            const viewportHeight = window.innerHeight;
            const navbarHeight = document.querySelector('nav').offsetHeight;
            const availableHeight = viewportHeight - navbarHeight;
            setContainerHeight(availableHeight);
        };

        updateContainerHeight();
        window.addEventListener('resize', updateContainerHeight);

        return () => {
            window.removeEventListener('resize', updateContainerHeight);
        };
    }, []);

    const filteredItems = items.filter(item =>
        searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ ...styles.productList, height: containerHeight }}>
            {filteredItems.length === 0 ? (
                <p>No products found</p>
            ) : (
                filteredItems.map((item) => (
                    <div key={item.id} style={styles.product}>
                        <div style={styles.imageContainer}>
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <div style={styles.productDetails}>
                            <h4 style={styles.productName}>{item.name}</h4>
                            <p style={styles.productPrice}>£{item.price.toFixed(2)}</p>
                            <p style={styles.productReviews}>{item.reviews} reviews</p>
                            <div style={styles.buttonContainer}>
                                <button
                                    style={styles.addToTrolleyButton}
                                    onClick={() => addToCart(item)}
                                >
                                    <Image
                                        src="/assets/images/shopping-cart.svg"
                                        alt="Shopping Cart"
                                        width={16}
                                        height={16}
                                        style={styles.cartIcon}
                                    />
                                    Add to trolley
                                </button>
                                <button
                                    style={styles.addToFavoritesButton}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#ffe6e6'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                                >
                                    <Image
                                        src="/assets/images/heart.svg"
                                        alt="Heart"
                                        width={16}
                                        height={16}
                                        style={styles.heartIcon}
                                    />
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    productList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        overflowY: 'auto',
    },
    product: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: 'calc(45vh - 2rem)',
        padding: '1rem',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '50%',
        marginBottom: '1rem',
    },
    productDetails: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
    },
    productName: {
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
    },
    productPrice: {
        fontSize: '1rem',
        fontWeight: 'bold',
        marginBottom: '0.5rem',
        color: '#333',
    },
    productReviews: {
        fontSize: '0.8rem',
        marginBottom: '1rem',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '0.5rem',
    },
    addToTrolleyButton: {
        backgroundColor: '#28a745',
        color: '#fff',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
    },
    addToFavoritesButton: {
        backgroundColor: '#fff',
        color: '#ff0000',
        padding: '0.5rem',
        border: '1px solid #ff0000',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        transition: 'background-color 0.3s ease',
    },
    cartIcon: {
        marginRight: '0.5rem',
    },
    heartIcon: {
        color: '#ff0000',
    },
};

export default ProductList;
