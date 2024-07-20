"use client";

import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const useCategory = () => {
    return useContext(CategoryContext);
};

export const CategoryProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const value = {
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
    };

    return (
        <CategoryContext.Provider value={value}>
            {children}
        </CategoryContext.Provider>
    );
};
