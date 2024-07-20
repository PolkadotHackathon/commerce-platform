"use client";

import "./globals.css";
import { CategoryProvider } from "@/contexts/CategoryContext";
import { CartProvider } from "@/contexts/CartContext";
import CustomNavbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import CookieConsent from "../components/CookieConsent";
import React, { ReactNode, useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import { ApiPromise, Keyring, WsProvider } from "@polkadot/api";
import { web3Accounts, web3Enable } from "@polkadot/extension-dapp";
import { InjectedAccountWithMeta } from "@polkadot/extension-inject/types";

interface LayoutProps {
  children: ReactNode;
}

const NAME = "BuyBuy";

const Layout = ({ children }: LayoutProps) => {
  const [api, setApi] = useState<ApiPromise | null>(null);
  const [keyring, setKeyring] = useState<Keyring | null>(null);
  const [accounts, setAccounts] = useState<InjectedAccountWithMeta[]>([]);
  const [selectedAccount, setSelectedAccount] =
      useState<InjectedAccountWithMeta | null>(null);
  const [showCookieConsent, setShowCookieConsent] = useState(true); // State for managing the cookie consent modal

  const setup = async () => {
    const provider = new WsProvider("ws://localhost:9944");
    const api: ApiPromise = await ApiPromise.create({ provider });
    setApi(api);
    setKeyring(new Keyring({ type: "sr25519" }));
  };

  const handleConnection = async () => {
    const extensions = await web3Enable(NAME);

    if (!extensions.length) {
      throw new Error("No extension found");
    }

    const allAccounts = await web3Accounts();
    setAccounts(allAccounts);

    if (allAccounts.length === 1) {
      setSelectedAccount(allAccounts[0]);
    }
  };

  const handleAccountSelection = async (e) => {
    const address = e.target.value;
    const account = accounts.find((account) => account.address === address);
    if (!account) {
      throw new Error("Account not found");
    }
    setSelectedAccount(account);
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
    if (!api) return;

    (async () => {
      const time = await api.query.timestamp.now();
      console.log(time.toPrimitive());
    })();
  }, [api]);

  useEffect(() => {
    const handlePress = (event: any) => {
      const target = event.target;
      if (!target) return;

      const id = target.id;
      if (!id) return;

      // Pad string to 64 bytes
      const padded = id.padEnd(47, " ");

      if (padded.length !== 47) {
        console.error(
            "ID is more than 47 characters, unable to record telemetry."
        );
        return;
      }

      // Encrypt
      const encrypted = CryptoJS.AES.encrypt(padded, NAME);
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
      <>
        {selectedAccount === null ? <></> : <></>}
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
              {showCookieConsent && (
                  <CookieConsent
                      onAccept={handleAcceptCookies}
                      onDecline={handleDeclineCookies}
                  />
              )}
            </body>
            </html>
          </CartProvider>
        </CategoryProvider>
      </>
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
