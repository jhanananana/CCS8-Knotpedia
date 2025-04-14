import { getFirestore, collection, addDoc } from "firebase/firestore";
import { app } from "../firebase.js";

// Initialize Firestore
const db = getFirestore(app);

const ContactFormService = {
  
   /* Submit contact form data to Firestore
   * @param {Object} formData - Contact form data (name, email, subject, message)
   * @returns {Promise} - Promise that resolves with the document reference
   */
  submitContactForm: async (formData) => {
    try {
      /*Automatically adds document to the firestore firebase collection */
      const docRef = await addDoc(collection(db, "contacts"), {
        firstname: formData.firstname,
        middlename: formData.middlename,
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
      return {
        success: false,
        error: error,
        message: "Sorry, there was an error sending your message. Please try again."
      };
    }
  }
};

export default ContactFormService;