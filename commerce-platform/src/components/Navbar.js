"use client";

import React, { useState } from 'react';
import { useCategory } from '@/contexts/CategoryContext';
import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';

const Navbar = () => {
    const { searchQuery, setSearchQuery } = useCategory();
    const { cartItems, removeFromCart } = useCart();
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
                <input
                    type="text"
                    placeholder="Search"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <button style={styles.searchButton}>Search</button>
            </div>
            <div style={styles.links}>
                <a href="#" style={styles.link}>Account</a>
                <a href="#" style={styles.link}>Support</a>
                <div style={styles.cartContainer}>
                    <Image
                        src="/assets/images/shopping-cart.svg"
                        alt="Cart"
                        style={styles.cartIcon}
                        onClick={toggleCartSummary}
                        width={24}
                        height={24}
                    />
                    {cartItems.length > 0 && (
                        <span style={styles.cartBadge} className="cart-badge-pointer" onClick={toggleCartSummary}>{cartItems.reduce((sum, item) => sum + item.quantity, 0)}</span>
                    )}
                    {showCartSummary && (
                        <div style={styles.cartSummary}>
                            {cartItems.length === 0 ? (
                                <p style={styles.emptyCart}>No items in cart</p>
                            ) : (
                                <>
                                    <ul style={styles.cartList}>
                                        {cartItems.map((item, index) => (
                                            <li key={index} style={styles.cartItem}>
                                                <img src={item.imageUrl} alt={item.name} style={styles.cartItemImage} />
                                                <div style={styles.cartItemDetails}>
                                                    <p style={styles.cartItemName}>{item.name}</p>
                                                    <p style={styles.cartItemPrice}>£{item.price.toFixed(2)} x {item.quantity}</p>
                                                </div>
                                                <button
                                                    style={styles.removeButton}
                                                    onClick={() => removeFromCart(item.id)}
                                                >
                                                    <img
                                                        src="/assets/images/x.svg"
                                                        alt="Remove"
                                                        style={styles.deleteIcon}
                                                    />
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                    <div style={styles.cartActions}>
                                        <button style={styles.viewCartButton}>View Cart</button>
                                        <button
                                            style={styles.checkoutButton}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.backgroundColor = '#28a745';
                                                e.currentTarget.style.color = '#fff';
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.backgroundColor = '#fff';
                                                e.currentTarget.style.color = '#28a745';
                                            }}
                                        >
                                            Checkout
                                        </button>
                                    </div>
                                </>
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
        flex: 1,
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
    removeButton: {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
    },
    deleteIcon: {
        width: '16px',
        height: '16px',
    },
    cartActions: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '1rem',
    },
    viewCartButton: {
        backgroundColor: '#f0f0f0',
        border: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginRight: '0.5rem', // Add margin to space out the buttons
    },
    checkoutButton: {
        backgroundColor: '#fff',
        color: '#28a745',
        border: '2px solid #28a745',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, color 0.3s ease',
    },
};

export default Navbar;
