import { collection, getDocs } from "firebase/firestore";
import { ref, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/api/firebase";

const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const items = [];

    for (const doc of querySnapshot.docs) {
        const data = doc.data();
        if (typeof data.images === 'string') {
            const imageRef = ref(storage, data.images);
            try {
                const imageUrl = await getDownloadURL(imageRef);
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
