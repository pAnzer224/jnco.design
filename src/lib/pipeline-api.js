import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhDU_Gax3HuJdyP1JZwfwHrvw6yy_XEkk",
  authDomain: "pipeline-jnco.firebaseapp.com",
  projectId: "pipeline-jnco",
  messagingSenderId: "377372912142",
  appId: "1:377372912142:web:ee2d45bce00b1f266b6a5f"
};

// Initialize Firebase with pipeline config
const app = initializeApp(firebaseConfig, "pipeline-connection");
const db = getFirestore(app);

export const submitInquiry = async (inquiryData) => {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...inquiryData,
      status: "New",
      createdAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export const uploadReferenceFile = async (file) => {
  const cloudName = "dumkkg3pt";
  const uploadPreset = "pipeline";
  
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', uploadPreset);

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, url: data.secure_url };
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    return { success: false, error };
  }
};
