import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase with pipeline config
const app = initializeApp(firebaseConfig, "pipeline-connection");
const db = getFirestore(app);

const sendEmailNotification = async (inquiryData) => {
  const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID;
  const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) return; // skip if not configured

  try {
    await emailjs.send(
      serviceId,
      templateId,
      {
        from_name: inquiryData.name,
        from_email: inquiryData.email,
        contact: inquiryData.contact || 'N/A',
        company: inquiryData.company || 'N/A',
        how_found: inquiryData.howFound || 'N/A',
        project_type: inquiryData.projectType,
        description: inquiryData.description || 'N/A',
        budget: inquiryData.budget,
        timeline: inquiryData.timeline,
        additional_notes: inquiryData.additionalNotes || 'N/A',
      },
      publicKey
    );
  } catch (err) {
    // Non-fatal — Firestore already saved it, just log the email failure
    console.warn('EmailJS notification failed:', err);
  }
};

export const submitInquiry = async (inquiryData) => {
  try {
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...inquiryData,
      status: "New",
      createdAt: serverTimestamp()
    });

    // Fire-and-forget email notification (non-blocking)
    sendEmailNotification(inquiryData);

    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding document: ", error);
    return { success: false, error };
  }
};

export const uploadReferenceFile = async (file) => {
  const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const uploadPreset = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;
  
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
