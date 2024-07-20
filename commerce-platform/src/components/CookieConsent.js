import React, { useState } from 'react';

const CookieConsent = ({ onAccept, onDecline }) => {
    return (
        <div style={styles.modal}>
            <div style={styles.modalContent}>
                {/*<img src="/assets/images/cookie-icon.svg" alt="Cookie Icon" style={styles.icon} />*/}
                <h2 style={styles.title}>Cookies Consent</h2>
                <p style={styles.text}>
                    This website use cookies to provide a superior and more personalized browsing experience.
                    <a href="#" style={styles.link}>Read more</a>
                </p>
                <div style={styles.buttonContainer}>
                    <button style={styles.acceptButton} onClick={onAccept}>Accept</button>
                    <button style={styles.declineButton} onClick={onDecline}>Decline</button>
                </div>
            </div>
        </div>
    );
};

const styles = {
    modal: {
        fontFamily: "Arial, sans-serif",
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
        width: '80%',
        maxWidth: '400px',
    },
    icon: {
        width: '40px',
        height: '40px',
        marginBottom: '10px',
    },
    title: {
        fontSize: '1.5rem',
        marginBottom: '10px',
    },
    text: {
        fontSize: '1rem',
        marginBottom: '20px',
    },
    link: {
        color: '#3b82f6',
        textDecoration: 'none',
        marginLeft: '5px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    acceptButton: {
        backgroundColor: '#3b82f6',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        flex: 1,
        marginRight: '10px',
    },
    declineButton: {
        backgroundColor: '#fff',
        color: '#3b82f6',
        border: '2px solid #3b82f6',
        padding: '10px 20px',
        borderRadius: '4px',
        cursor: 'pointer',
        flex: 1,
    },
};

export default CookieConsent;
