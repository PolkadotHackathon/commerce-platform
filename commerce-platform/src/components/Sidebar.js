import React from 'react';

const Sidebar = () => {
    return (
        <aside style={styles.sidebar}>
            <h3>Categories</h3>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <img src="/assets/images/plug.svg" alt="Electronics" style={styles.icon} />
                    <span style={styles.categoryName}>Electronics</span>
                </li>
                <li style={styles.li}>
                    <img src="/assets/images/dumbbell.svg" alt="Sports & Leisure" style={styles.icon} />
                    <span style={styles.categoryName}>Sports & Leisure</span>
                </li>
                <li style={styles.li}>
                    <img src="/assets/images/shirt.svg" alt="Clothing" style={styles.icon} />
                    <span style={styles.categoryName}>Clothing</span>
                </li>
                <li style={styles.li}>
                    <img src="/assets/images/house.svg" alt="Home & Furniture" style={styles.icon} />
                    <span style={styles.categoryName}>Home & Furniture</span>
                </li>
                <li style={styles.li}>
                    <img src="/assets/images/square-activity.svg" alt="Health & Beauty" style={styles.icon} />
                    <span style={styles.categoryName}>Health & Beauty</span>
                </li>
                <li style={styles.li}>
                    <img src="/assets/images/flower-2.svg" alt="Garden & DIY" style={styles.icon} />
                    <span style={styles.categoryName}>Garden & DIY</span>
                </li>
            </ul>
            <h3>Brands</h3>
            <ul style={styles.ul}>
                <li style={styles.li}>
                    <img src="/assets/images/apple.svg" alt="Apple" style={styles.icon} />
                    <span style={styles.categoryName}>Apple</span>
                </li>
                <li style={styles.li}>
                    <img src="/assets/images/xiaomi.svg" alt="Xiaomi" style={styles.icon} />
                    <span style={styles.categoryName}>Xiaomi</span>
                </li>
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
        padding: '0.5rem 0'
    },
    icon: {
        marginRight: '10px',
        width: '16px',
        height: '16px'
    },
    categoryName: {
        fontSize: '1rem',
        fontWeight: '500'
    }
};

export default Sidebar;
