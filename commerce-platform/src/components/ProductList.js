"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useCategory } from '@/contexts/CategoryContext';
import fetchProducts from '../api/fetchProducts';

const ProductList = () => {
    const { selectedCategory } = useCategory();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const products = await fetchProducts(selectedCategory);
            setProducts(products);
        };
        getProducts();
    }, [selectedCategory]);

    return (
        <div style={styles.productList}>
            {products.length === 0 ? (
                <p>Loading...</p>
            ) : (
                products.map((item) => (
                    <div key={item.id} style={styles.product}>
                        <div style={styles.imageContainer}>
                            <Image
                                src={item.imageUrl}
                                alt={item.name}
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <div style={styles.productDetails}>
                            <h4>{item.name}</h4>
                            <p>${item.price}</p>
                            <p>{item.reviews} reviews</p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

const styles = {
    productList: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
        gap: '1rem',
        padding: '1rem'
    },
    product: {
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        overflow: 'hidden',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    imageContainer: {
        position: 'relative',
        width: '100%',
        height: '200px',
        overflow: 'hidden'
    },
    image: {
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain'
    },
    productDetails: {
        padding: '1rem',
        textAlign: 'center',
    }
};

export default ProductList;
