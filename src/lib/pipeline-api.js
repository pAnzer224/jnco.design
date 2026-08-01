import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, doc, setDoc, getDoc, updateDoc, increment } from "firebase/firestore";
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

const fetchLocation = async () => {
  try {
    const res = await fetch("https://ipapi.co/json/");
    if (res.ok) {
      const data = await res.json();
      if (data.city && data.country_name) {
        return `${data.city}, ${data.country_name}`;
      }
    }
  } catch (e) {
    console.warn("ipapi failed, trying fallback...", e);
  }
  try {
    const res = await fetch("https://geolocation-db.com/json/");
    if (res.ok) {
      const data = await res.json();
      if (data.city && data.country_name) {
        return `${data.city}, ${data.country_name}`;
      }
    }
  } catch (e) {
    console.warn("Fallback geolocation failed", e);
  }
  return "Unknown Location";
};

export const trackVisit = async (path) => {
  try {
    let visitorId = localStorage.getItem("visitor_id");
    if (!visitorId) {
      visitorId = "vis_" + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
      localStorage.setItem("visitor_id", visitorId);
    }

    let locationStr = localStorage.getItem("visitor_location");
    if (!locationStr) {
      locationStr = await fetchLocation();
      localStorage.setItem("visitor_location", locationStr);
    }

    // Check if new session
    const isNewSession = !sessionStorage.getItem("session_active");
    if (isNewSession) {
      sessionStorage.setItem("session_active", "true");
    }

    const visitorDocRef = doc(db, "portfolio_visits", visitorId);
    const visitorDoc = await getDoc(visitorDocRef);

    const updateData = {
      lastActive: serverTimestamp(),
      location: locationStr,
      lastPage: path,
    };

    if (!visitorDoc.exists()) {
      // Create new visitor doc
      updateData.createdAt = serverTimestamp();
      updateData.sessions = 1;
      updateData.type = localStorage.getItem("visitor_type") || "Visitor";
      updateData.name = localStorage.getItem("visitor_name") || "Anonymous visitor";
      updateData.email = localStorage.getItem("visitor_email") || "";
      updateData.pages = [path];
      await setDoc(visitorDocRef, updateData);
    } else {
      // Update existing visitor doc
      if (isNewSession) {
        updateData.sessions = increment(1);
      }
      // Add path to pages if not already in it
      const currentPages = visitorDoc.data().pages || [];
      if (!currentPages.includes(path)) {
        updateData.pages = [...currentPages, path];
      }
      await updateDoc(visitorDocRef, updateData);
    }
  } catch (err) {
    console.warn("Tracking failed:", err);
  }
};

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
    const visitorId = localStorage.getItem("visitor_id");
    const docRef = await addDoc(collection(db, "inquiries"), {
      ...inquiryData,
      visitorId: visitorId || "",
      status: "New",
      createdAt: serverTimestamp()
    });

    if (visitorId) {
      // Mark visitor as identified/Lead
      localStorage.setItem("visitor_type", "Lead");
      localStorage.setItem("visitor_name", inquiryData.name);
      localStorage.setItem("visitor_email", inquiryData.email);

      // Update their visitor document in Firestore
      try {
        await updateDoc(doc(db, "portfolio_visits", visitorId), {
          type: "Lead",
          name: inquiryData.name,
          email: inquiryData.email
        });
      } catch (e) {
        console.warn("Failed to update visitor doc on inquiry submit:", e);
      }
    }

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
