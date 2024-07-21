"use client";

import "./globals.css";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { CartProvider } from "@/contexts/CartContext";
import CustomNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CookieConsent from "../components/CookieConsent";
import AccountSelectionModal from "../components/AccountSelectionModal";
import React, { ReactNode, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";
import { web3FromAddress } from "@polkadot/extension-dapp";

import RegisterWebsite from "../components/CookieConsent";

interface LayoutProps {
    children: ReactNode;
}

// const NAME = "BuyBuy";
let GLOBAL_KEY = undefined;

const Layout = ({ children }: LayoutProps) => {
    const [api, setApi] = useState<ApiPromise | null>(null);
    const [keyring, setKeyring] = useState<Keyring | null>(null);
    const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
    const [selectedAccount, setSelectedAccount] = useState<InjectedAccountWithMeta | null>(null);
    const [showCookieConsent, setShowCookieConsent] = useState(true); // State for managing the cookie consent modal
    const [isLoadingWeb3, setIsLoadingWeb3] = useState(false);
    const [showAccountSelection, setShowAccountSelection] = useState(false);

    const setup = async () => {
        const provider = new WsProvider("ws://localhost:9944");
        const api: ApiPromise = await ApiPromise.create({ provider });
        setApi(api);
        setKeyring(new Keyring({ type: "sr25519" }));
    };

    const handleConnection = async () => {
        setIsLoadingWeb3(true);
        const extensions = await web3Enable("BuyBuy");

        if (!extensions.length) {
            setIsLoadingWeb3(false);
            throw new Error("No extension found");
        }

        const allAccounts = await web3Accounts();
        setAccounts(allAccounts);

        if (allAccounts.length === 1) {
            setSelectedAccount(allAccounts[0]);
        } else if (allAccounts.length > 1) {
            setShowAccountSelection(true); // Show account selection modal if more than one account is available
        }
        setIsLoadingWeb3(false);

        // Get the gobal key from teh config
        let key = await api.consts.dbModule.globalKey;
        GLOBAL_KEY = key.toString();
        console.log("GLOBAL_KEY", GLOBAL_KEY);
    };

    const handleAccountSelection = (address) => {
        const account = accounts.find((account) => account.address === address);
        if (!account) {
            throw new Error("Account not found");
        }
        setSelectedAccount(account);
        setShowAccountSelection(false); // Hide the account selection modal
    };

    const handleAcceptCookies = () => {
        handleConnection();
        setShowCookieConsent(false);
    };

    const handleDeclineCookies = () => {
        setShowCookieConsent(false);
    };

    useEffect(() => {
        setup();
    }, []);

    useEffect(() => {
        const handlePress = (event: any) => {
            const target = event.target;
            if (!target) return;

            const id = target.id;
            if (!id) return;

            // Pad string to 64 bytes
            const padded = id.padEnd(47, " ");

            if (padded.length !== 47) {
                console.error("ID is more than 47 characters, unable to record telemetry.");
                return;
            }

            // Encrypt
            const encrypted = CryptoJS.AES.encrypt(padded, NAME);
            const encryptedBytes = CryptoJS.enc.Base64.parse(encrypted.toString());
            const encryptedArray = Array.from(encryptedBytes.words);

            // Decrypt
            // const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
            // const decrypted = bytes.toString(CryptoJS.enc.Utf8);
            // console.log('Decrypted:', decrypted);
        };

        // Add event listeners
        document.addEventListener("mousedown", handlePress);
        document.addEventListener("touchstart", handlePress, { passive: false });

        // Cleanup function to remove event listeners
        return () => {
            document.removeEventListener("mousedown", handlePress);
            document.removeEventListener("touchstart", handlePress);
        };
    }, []); // Empty dependency array means this effect runs once on mount

    function createButton() {
        return <button onClick={
            async () => {

                // const { data: balance } = await api.query.system.account(selectedAccount.address);
                // console.log("Balance", balance.free.toHuman());
                //
                // const existentialDeposit = await api.consts.balances.existentialDeposit;
                // console.log("Existential Deposit", existentialDeposit.toHuman());
                //
                // console.log("API.TX", api.tx.dbModule.registerWebsite);
                // console.log("Selected Account", selectedAccount);

                // Get the signer
                // const injector = await web3FromAddress(selectedAccount.address);

                // Set the signer
                // api.setSigner(injector.signer);

                // const unsub = await api.tx.dbModule.registerWebsite([0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
                //     .signAndSend(selectedAccount.address, { signer: injector.signer }, ({ events = [], status }) => {
                //         console.log('Transaction status:', status.type);
                //
                //         if (status.isInBlock) {
                //             console.log('Included at block hash', status.asInBlock.toHex());
                //             console.log('Events:');
                //
                //             events.forEach(({ phase, event: { data, method, section } }) => {
                //                 console.log('\t', phase.toString(), `: ${section}.${method}`, data.toString());
                //             });
                //         } else if (status.isFinalized) {
                //             console.log('Finalized block hash', status.asFinalized.toHex());
                //             unsub();
                //         }
                //     });

                const unsub = await api.tx.dbModule.registerWebsite(3).
                    send(({ events = [], status }) => {
                        console.log('Transaction status:', status.type);
                    }
                    );

            }}>Query the Blockchain</button>;
    }

    return (
        <CategoryProvider>
            <CartProvider>
                <html lang="en">
                    <head>
                        <meta charSet="UTF-8" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>BuyBuy</title>
                    </head>
                    <body>
                        <div style={styles.container}>
                            <CustomNavbar />
                            {createButton()}
                            <div style={styles.main}>
                                <Sidebar />
                                <div style={styles.content}>{children}</div>
                            </div>
                        </div>
                        {isLoadingWeb3 && <div style={styles.blurBg}>Loading Web3...</div>}
                        {showCookieConsent && (
                            <CookieConsent onAccept={handleAcceptCookies} onDecline={handleDeclineCookies} />
                        )}
                        {showAccountSelection && (
                            <AccountSelectionModal
                                accounts={accounts}
                                onSelectAccount={handleAccountSelection}
                            />
                        )}
                        {/* Selected account picker */}
                        {selectedAccount == null && accounts.length > 1 && <></>}
                    </body>
                </html>
            </CartProvider>
        </CategoryProvider>
    );
};

const styles = {
    body: {
        margin: 0,
        padding: 0,
        height: "100vh",
        overflow: "hidden",
    },
    container: {
        fontFamily: "Arial, sans-serif",
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    main: {
        display: "flex",
        flex: 1,
        overflow: "hidden",
    },
    content: {
        padding: "1rem",
        flex: 1,
        overflow: "hidden",
    },
    blurBg: {
        fontFamily: "Arial, sans-serif",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        backdropFilter: "blur(10px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
    },
};

export default Layout;
