"use client";

import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (cartItem) => cartItem.id === item.id
            );

            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex] = {
                    ...updatedItems[existingItemIndex],
                    quantity: updatedItems[existingItemIndex].quantity + 1
                };
                return updatedItems;
            } else {
                return [...prevItems, { ...item, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCartItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex(
                (cartItem) => cartItem.id === itemId
            );

            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                if (updatedItems[existingItemIndex].quantity > 1) {
                    updatedItems[existingItemIndex] = {
                        ...updatedItems[existingItemIndex],
                        quantity: updatedItems[existingItemIndex].quantity - 1
                    };
                } else {
                    updatedItems.splice(existingItemIndex, 1);
                }
                return updatedItems;
            }

            return prevItems;
        });
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};
