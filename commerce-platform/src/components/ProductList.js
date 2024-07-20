const products = [
    {
        name: "Oraimo Freepods 3",
        price: "26.49",
        reviews: 134,
        rating: 4.5,
        currency: "USD",
        image: "/images/oraimo-freepods-3.jpg"
    },
    {
        name: "Apple Airpods Pro",
        price: "222.51",
        reviews: 12,
        rating: 4.8,
        currency: "USD",
        image: "/images/apple-airpods-pro.jpg"
    }
];

const ProductList = () => {
    return (
        <div style={styles.productList}>
            {products.map((product, index) => (
                <div key={index} style={styles.product}>
                    <img src={product.image} alt={product.name} style={styles.image} />
                    <h4>{product.name}</h4>
                    <p>${product.price} {product.currency}</p>
                    <p>{product.reviews} reviews</p>
                </div>
            ))}
        </div>
    );
};

const styles = {
    productList: {
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap',
        padding: '1rem'
    },
    product: {
        border: '1px solid #e0e0e0',
        padding: '1rem',
        borderRadius: '8px',
        textAlign: 'center',
        width: 'calc(33.333% - 2rem)'
    },
    image: {
        width: '100%',
        height: 'auto'
    }
};

export default ProductList;
