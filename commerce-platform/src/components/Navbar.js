const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>BuyBuy</div>
            <input type="text" placeholder="Search" style={styles.searchInput} />
            <button style={styles.searchButton}>Search</button>
            <div style={styles.links}>
                <a href="#">Account</a>
                <a href="#">Support</a>
                <a href="#"><i className="fa fa-shopping-cart"></i></a>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0'
    },
    brand: {
        fontSize: '1.5rem',
        fontWeight: 'bold',
    },
    searchInput: {
        padding: '0.5rem',
        fontSize: '1rem',
    },
    searchButton: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        marginLeft: '0.5rem',
        backgroundColor: '#ff6f00',
        border: 'none',
        color: 'white',
        cursor: 'pointer'
    },
    links: {
        display: 'flex',
        gap: '1rem'
    }
};

export default Navbar;
