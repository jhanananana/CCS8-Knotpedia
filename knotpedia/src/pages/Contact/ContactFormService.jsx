import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../../firebase.js";

// Initialize Firestore
const db = getFirestore(app);

const ContactFormService = {
  submitContactForm: async (formData) => {
    try {
      // Simulate specific errors for testing - Remove these in production
      /* Uncomment any of these lines to test specific error scenarios:
      if (Math.random() > 0.7) throw new Error("network error: Failed to connect");
      if (Math.random() > 0.7) throw new Error("database connection refused");
      if (Math.random() > 0.7) throw new Error("timeout exceeded");
      */
      
      /*Automatically adds document to the firestore firebase collection */
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
      
      // Different error messages based on error type
      let errorMessage = "Sorry, there was an error sending your message. Please try again.";
      
      // Check for specific error types - limited to the three main scenarios
      if (error.code === 'unavailable' || error.message?.includes('network')) {
        errorMessage = "Network error. Please check your internet connection and try again.";
      } else if (error.code === 'resource-exhausted' || error.message?.includes('timeout')) {
        errorMessage = "Request timed out. Please try again later.";
      } else if (error.code === 'internal' || error.message?.includes('database')) {
        errorMessage = "Database connection error. Our team has been notified of this issue.";
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