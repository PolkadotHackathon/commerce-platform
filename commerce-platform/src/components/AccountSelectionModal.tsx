import React, { useState } from "react";

const AccountSelectionModal = ({ accounts, onSelectAccount }) => {
    const [selectedAddress, setSelectedAddress] = useState(accounts[0]?.address || "");

    const handleSelectChange = (event) => {
        setSelectedAddress(event.target.value);
    };

    const handleConfirmSelection = () => {
        onSelectAccount(selectedAddress);
    };

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h2>Select an Account</h2>
                <p>You have selected more than one account to connect. Please choose one wallet to continue.</p>
                <select value={selectedAddress} onChange={handleSelectChange} style={styles.select}>
                    {accounts.map((account) => (
                        <option key={account.address} value={account.address}>
                            {account.meta.name}
                        </option>
                    ))}
                </select>
                <button onClick={handleConfirmSelection} style={styles.confirmButton}>
                    Confirm Selection
                </button>
            </div>
        </div>
    );
};

const styles = {
    overlay: {
        fontFamily: "Arial, sans-serif",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
    modal: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        width: "90%",
        maxWidth: "500px",
        textAlign: "center",
    },
    select: {
        width: "100%",
        padding: "0.5rem",
        marginBottom: "1rem",
        borderRadius: "4px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    },
    confirmButton: {
        backgroundColor: "#007bff",
        color: "#fff",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "1rem",
    },
};

export default AccountSelectionModal;
