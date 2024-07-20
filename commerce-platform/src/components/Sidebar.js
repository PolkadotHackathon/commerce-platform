"use client";

import React, { useState } from 'react';
import { useCategory } from '@/contexts/CategoryContext';

const ORANGE_COLOR = '#ff6f00';

const Sidebar = () => {
    const { selectedCategory, setSelectedCategory } = useCategory();
    const categories = [
        { name: 'Electronics', icon: '/assets/images/plug.svg' },
        { name: 'Sports & Leisure', icon: '/assets/images/some-other-icon.svg' },
        { name: 'Clothing', icon: '/assets/images/some-other-icon.svg' },
        { name: 'Home & Furniture', icon: '/assets/images/some-other-icon.svg' },
        { name: 'Health & Beauty', icon: '/assets/images/some-other-icon.svg' },
        { name: 'Garden & DIY', icon: '/assets/images/some-other-icon.svg' },
    ];

    const [hoveredCategory, setHoveredCategory] = useState(null);

    return (
        <aside style={styles.sidebar}>
            <h3>Categories</h3>
            <ul style={styles.ul}>
                {categories.map((category) => (
                    <li
                        key={category.name}
                        style={
                            selectedCategory === category.name
                                ? { ...styles.li, ...styles.liSelected }
                                : styles.li
                        }
                        onClick={() => setSelectedCategory(category.name)}
                        onMouseEnter={() => setHoveredCategory(category.name)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <img src={category.icon} alt={category.name} style={styles.icon} />
                        <span style={styles.categoryName}>{category.name}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
};

const styles = {
    sidebar: {
        padding: '1rem',
        backgroundColor: '#fff',
        borderRight: '1px solid #e0e0e0'
    },
    ul: {
        listStyleType: 'none',
        padding: 0
    },
    li: {
        display: 'flex',
        alignItems: 'center',
        padding: '0.5rem 0',
        cursor: 'pointer',
        transition: 'color 0.3s',
    },
    liSelected: {
        color: ORANGE_COLOR,
    },
    icon: {
        marginRight: '10px',
        width: '16px',
        height: '16px'
    },
    categoryName: {
        fontSize: '1rem',
        fontWeight: '500'
    },
};

export default Sidebar;
