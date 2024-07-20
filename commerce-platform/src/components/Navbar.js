"use client";

import React, { useState } from 'react';
import { useCategory } from '@/contexts/CategoryContext';
import { useCart } from '@/contexts/CartContext';

const Navbar = () => {
    const { searchQuery, setSearchQuery } = useCategory();
    const { cartItems } = useCart();
    const [showCartSummary, setShowCartSummary] = useState(false);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleCartSummary = () => {
        setShowCartSummary((prev) => !prev);
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>
                <span style={styles.brandName}>BuyBuy</span>
            </div>
            <div style={styles.searchContainer}>
                <img src="/assets/images/search.svg" alt="Search" style={styles.searchIcon} />
                <input
                    type="text"
                    placeholder="Search"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </div>
            <div style={styles.links}>
                <a href="#" style={styles.link}>Account</a>
                <a href="#" style={styles.link}>Support</a>
                <div style={styles.cartContainer}>
                    <img
                        src="/assets/images/shopping-cart.svg"
                        alt="Cart"
                        style={styles.cartIcon}
                        onClick={toggleCartSummary}
                    />
                    {cartItems.length > 0 && (
                        <span style={styles.cartBadge}>{cartItems.length}</span>
                    )}
                    {showCartSummary && (
                        <div style={styles.cartSummary}>
                            {cartItems.length === 0 ? (
                                <p style={styles.emptyCart}>No items in cart</p>
                            ) : (
                                <ul style={styles.cartList}>
                                    {cartItems.map((item, index) => (
                                        <li key={index} style={styles.cartItem}>
                                            <img src={item.imageUrl} alt={item.name} style={styles.cartItemImage} />
                                            <div style={styles.cartItemDetails}>
                                                <p style={styles.cartItemName}>{item.name}</p>
                                                <p style={styles.cartItemPrice}>£{item.price.toFixed(2)} x {item.quantity}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
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
        borderBottom: '1px solid #e0e0e0',
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
    searchIcon: {
        width: '16px',
        height: '16px',
        marginLeft: '0.5rem',
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
        cursor: 'pointer',
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
    cartSummary: {
        position: 'absolute',
        top: '30px',
        right: '0',
        backgroundColor: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '1rem',
        width: '300px',
        zIndex: '1000',
        transition: 'opacity 0.3s ease',
        opacity: 1,
    },
    emptyCart: {
        textAlign: 'center',
        color: '#666',
    },
    cartList: {
        listStyleType: 'none',
        padding: 0,
        margin: 0,
    },
    cartItem: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: '0.5rem',
    },
    cartItemImage: {
        width: '50px',
        height: '50px',
        borderRadius: '4px',
        marginRight: '0.5rem',
    },
    cartItemDetails: {
        display: 'flex',
        flexDirection: 'column',
    },
    cartItemName: {
        fontSize: '0.9rem',
        fontWeight: '500',
        marginBottom: '0.2rem',
    },
    cartItemPrice: {
        fontSize: '0.9rem',
        color: '#333',
    },
};

export default Navbar;
