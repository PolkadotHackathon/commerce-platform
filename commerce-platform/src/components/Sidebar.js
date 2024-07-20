const Sidebar = () => {
    return (
        <aside style={styles.sidebar}>
            <h3>Categories</h3>
            <ul>
                <li>Phones & Tablets</li>
                <li>Laptops</li>
                <li>Accessories</li>
                <li>Media Gadgets</li>
                <li>Others</li>
            </ul>
            <h3>Brands</h3>
            <ul>
                <li>Apple</li>
                <li>Xiaomi</li>
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
        padding: '0.5rem 0'
    }
};

export default Sidebar;
