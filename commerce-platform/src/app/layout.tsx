"use client";

import "./globals.css";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { CartProvider } from "@/contexts/CartContext";
import CustomNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import React, { ReactNode, useEffect, useState } from "react";
import CryptoJS from 'crypto-js';

interface LayoutProps {
  children: ReactNode;
}

const SECRET_KEY = 'bob';

const Layout = ({ children }: LayoutProps) => {

  const [api, setApi] = useState(null);
  const [keyring, setKeyring] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState(null);

  useEffect(() => {
    const handlePress = (event: any) => {
      const target = event.target;
      if(!target) return;

      const id = target.id;
      if(!id) return;

      // Pad string to 64 bytes
      const padded = id.padEnd(47, ' ');

      if (padded.length !== 47) {
        console.error('ID is more than 47 characters, unable to record telemetry.');
        return;
      }

      // Encrypt
      const encrypted = CryptoJS.AES.encrypt(padded, SECRET_KEY);
      const encryptedBytes = CryptoJS.enc.Base64.parse(encrypted.toString());
      const encryptedArray = Array.from(encryptedBytes.words);

      // Decrupt
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

  return (
    <CategoryProvider>
      <CartProvider>
        <html lang="en">
          <head>
            <meta charSet="UTF-8" />
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1.0"
            />
            <title>BuyBuy</title>
          </head>
          <body>
            <div style={styles.container}>
              <CustomNavbar />
              <div style={styles.main}>
                <Sidebar />
                <div style={styles.content}>{children}</div>
              </div>
            </div>
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
};

export default Layout;
