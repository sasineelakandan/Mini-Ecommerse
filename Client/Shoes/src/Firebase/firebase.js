// firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdyD2AVJe4xHXRhR2WueZDm-BMmShlogs",
    authDomain: "mini-ecommerse.firebaseapp.com",
    projectId: "mini-ecommerse",
    storageBucket: "mini-ecommerse.appspot.com",
    messagingSenderId: "902227979675",
    appId: "1:902227979675:web:5078723b462dea4fc1053e",
    measurementId: "G-LMQ5DFJW7W"
  };
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
  
  // Function to upload an image
  export const uploadImageToFirebase = async (file) => {
    const storageRef = ref(storage, `images/${file.name}`);
    await uploadBytes(storageRef, file);
    const imageUrl = await getDownloadURL(storageRef);
    return imageUrl;
  };
