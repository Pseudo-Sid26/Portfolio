/**
 * EmailJS Service - Easy email without backend setup
 * Sign up at https://emailjs.com for free
 */

import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

class EmailJSService {
  private serviceId: string;
  private templateId: string;
  private publicKey: string;

  constructor() {
    // These will be set from environment variables
    this.serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || '';
    this.templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '';
    this.publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '';
  }

  /**
   * Initialize EmailJS with your credentials
   */
  init() {
    if (this.publicKey) {
      emailjs.init(this.publicKey);
    }
  }

  /**
   * Send email using EmailJS
   */
  async sendEmail(formData: ContactFormData): Promise<boolean> {
    try {
      // Initialize if not already done
      this.init();

      if (!this.serviceId || !this.templateId || !this.publicKey) {
        console.warn('EmailJS not configured. Check environment variables.');
        return false;
      }

      // Ensure we have valid data
      const safeFormData = {
        name: formData.name || 'No Name Provided',
        email: formData.email || 'no-email@provided.com',
        subject: formData.subject || 'No Subject',
        message: formData.message || 'No message content'
      };

      const templateParams = {
        // Standard variable names
        name: safeFormData.name,
        email: safeFormData.email,
        subject: safeFormData.subject,
        message: safeFormData.message,
        
        // Alternative variable names for compatibility
        user_name: safeFormData.name,
        user_email: safeFormData.email,
        user_subject: safeFormData.subject,
        user_message: safeFormData.message,
        
        // From/To routing
        from_name: safeFormData.name,
        from_email: safeFormData.email,
        reply_to: safeFormData.email,
        to_email: 'your_email@example.com',
        
        // Additional common formats
        contact_name: safeFormData.name,
        contact_email: safeFormData.email,
        contact_subject: safeFormData.subject,
        contact_message: safeFormData.message,
        
        // Metadata
        timestamp: new Date().toLocaleString(),
        website: 'Portfolio Contact Form'
      };

      console.log('Sending email via EmailJS...');

      const response = await emailjs.send(
        this.serviceId,
        this.templateId,
        templateParams
      );

      console.log('Email sent successfully!', response);
      return true;
    } catch (error) {
      console.error('Error sending email via EmailJS:', error);
      return false;
    }
  }

  /**
   * Check if EmailJS is properly configured
   */
  isConfigured(): boolean {
    return !!(this.serviceId && this.templateId && this.publicKey);
  }
}

export const emailJSService = new EmailJSService();
export default emailJSService;
