import { collection, query, where, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/api/firebase";

const fetchProducts = async (category) => {
    const productsCollection = collection(db, "products");
    const q = category ? query(productsCollection, where("category", "==", category)) : productsCollection;
    const querySnapshot = await getDocs(q);
    const items = [];

    for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (typeof data.images === 'string') { // Ensure images is a string
            const imageRef = ref(storage, data.images); // Create reference to the image
            try {
                const imageUrl = await getDownloadURL(imageRef); // Fetch the download URL
                items.push({ id: doc.id, ...data, imageUrl });
            } catch (error) {
                console.error('Error fetching image URL:', error);
            }
        } else {
            console.error('Invalid image path:', data.images);
        }
    }

    return items;
};

export default fetchProducts;