"use client";

import React from 'react';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
    const { cartItems } = useCart();

    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>
                <span style={styles.brandName}>BuyBuy</span>
            </div>
            <div style={styles.searchContainer}>
                <input type="text" placeholder="Search" style={styles.searchInput} />
                <button style={styles.searchButton}>Search</button>
            </div>
            <div style={styles.links}>
                <a href="#" style={styles.link}>Account</a>
                <a href="#" style={styles.link}>Support</a>
                <div style={styles.cartContainer}>
                    <img src="/assets/images/shopping-cart.svg" alt="Cart" style={styles.cartIcon} />
                    {cartItems.length > 0 && (
                        <span style={styles.cartBadge}>{cartItems.length}</span>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#fff',
        borderBottom: '1px solid #e0e0e0'
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
    },
    brandName: {
        marginLeft: '10px',
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    searchContainer: {
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #e0e0e0',
        borderRadius: '5px',
        overflow: 'hidden',
    },
    searchInput: {
        padding: '0.5rem',
        border: 'none',
        outline: 'none',
        width: '300px',
    },
    searchButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#ff6f00',
        border: 'none',
        color: 'white',
        cursor: 'pointer',
    },
    links: {
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
    },
    link: {
        textDecoration: 'none',
        color: '#000',
        fontWeight: '500',
    },
    cartContainer: {
        position: 'relative',
    },
    cartIcon: {
        width: '24px',
        height: '24px',
    },
    cartBadge: {
        position: 'absolute',
        top: '-5px',
        right: '-10px',
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '0.2rem 0.5rem',
        fontSize: '0.8rem',
    },
};

export default Navbar;
