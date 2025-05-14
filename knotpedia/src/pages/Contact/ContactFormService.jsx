import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebase.js";

// Initialize Firestore
const db = getFirestore(app);

const ContactFormService = {
  submitContactForm: async (formData) => {
    try {
      // Simulate delay
      //await new Promise(resolve => setTimeout(resolve, 11000)); // 11 seconds USE TESTING ONLY

      // Automatically adds document to the firestore firebase collection
      const docRef = await addDoc(collection(db, "contacts"), {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        createdAt: new Date()
      });

      return {
        success: true,
        docRef: docRef,
        message: "Thank you! Your message has been sent successfully."
      };
    } catch (error) {
      console.error("Error submitting contact form:", error);

      // Only handle network and timeout errors
      let errorMessage = "Sorry, there was an error sending your message. Please try again.";

      if (
        error.code === 'unavailable' ||
        (typeof error.message === "string" && error.message.toLowerCase().includes('network'))
      ) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (
        error.code === 'resource-exhausted' ||
        (typeof error.message === "string" && error.message.toLowerCase().includes('timeout'))
      ) {
        errorMessage = "No internet connection. Please check your network and try again.";
      }

      return {
        success: false,
        error: error,
        message: errorMessage
      };
    }
  }
};

export default ContactFormService;