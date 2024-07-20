import './globals.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
}


const Layout = ({ children }: LayoutProps) => {
    return (
        <html lang="en">
        <head>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>BuyBuy</title>
        </head>
        <body>
        <div style={styles.container}>
            <Navbar />
            <div style={styles.main}>
                <Sidebar />
                <div style={styles.content}>
                    {children}
                </div>
            </div>
        </div>
        </body>
        </html>
    );
};

const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
    },
    main: {
        display: 'flex',
    },
    content: {
        padding: '1rem',
        flex: 1,
    }
};

export default Layout;
