// src/fetchItems.js
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const items = [];
    querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
    });
    return items;
};

export default fetchItems;
