import React from 'react';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>
                {/*<img src="/path/to/logo.png" alt="Ayapone" style={{ height: '40px' }} />*/}
                <span style={styles.brandName}>BuyBuy</span>
            </div>
            <div style={styles.searchContainer}>
                <img src="/assets/images/search.svg" alt="Search" style={styles.searchIcon} />
                <input type="text" placeholder="Search" style={styles.searchInput} />
                <button style={styles.searchButton}>Search</button>
            </div>
            <div style={styles.links}>
                <a href="#" style={styles.link}>Account</a>
                <a href="#" style={styles.link}>Support</a>
                <img src="/assets/images/shopping-cart.svg" alt="Shopping Cart" style={styles.shoppingCart} />
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
    searchIcon: {
        padding: '0 10px',
        height: '16px',
        width: '16px',
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
    icon: {
        fontSize: '24px',
    },
    shoppingCart: {
        height: '24px',
        width: '24px',
    }
};

export default Navbar;
