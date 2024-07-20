"use client";

import React, { createContext, useContext, useState } from 'react';

const CategoryContext = createContext();

export const useCategory = () => {
    return useContext(CategoryContext);
}

export const CategoryProvider = ({ children }) => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <CategoryContext.Provider value={{ selectedCategory, setSelectedCategory, searchQuery, setSearchQuery }}>
            {children}
        </CategoryContext.Provider>
    );
};
