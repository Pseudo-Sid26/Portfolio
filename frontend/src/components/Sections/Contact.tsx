import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import type { ContactForm } from '../../types';
import { emailJSService } from '../../services/emailjs';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      console.log('Attempting to send email with data:', {
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        messageLength: formData.message.length
      });

      let result = false;

      // Try EmailJS (primary and only method)
      if (emailJSService.isConfigured()) {
        console.log('Trying EmailJS (primary method)...');
        result = await emailJSService.sendEmail(formData);
        console.log('EmailJS result:', result);
      } else {
        console.log('EmailJS not configured');
      }

      console.log('Email send result:', result);
      
      if (result) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: '',
        });
        console.log('Email sent successfully!');
      } else {
        setSubmitStatus('error');
        console.error('All email sending methods failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'siddhesh26.chavan@gmail.com',
      href: 'mailto:siddhesh26.chavan@gmail.com',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      value: '+91 7558276908',
      href: 'tel:+917558276908',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      value: 'Pune, MH',
      href: '#',
    },
  ];

  return (
    <section id="contact" className="relative py-16 bg-gradient-to-b from-white via-gray-50/30 to-white dark:from-gray-900 dark:via-gray-800/30 dark:to-gray-900 section-padding transition-all duration-700 overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/3 w-80 h-80 bg-gradient-to-br from-pink-400/5 to-red-400/5 dark:from-pink-400/10 dark:to-red-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 35, 0],
            y: [0, -35, 0],
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 55,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-gradient-to-br from-violet-400/5 to-indigo-400/5 dark:from-violet-400/10 dark:to-indigo-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -30, 0],
            y: [0, 30, 0],
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 48,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 15
          }}
        />
        <motion.div
          className="absolute top-10 left-10 w-56 h-56 bg-gradient-to-br from-emerald-400/5 to-cyan-400/5 dark:from-emerald-400/10 dark:to-cyan-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 25, 0],
            y: [0, -25, 0],
            scale: [1, 1.2, 1],
            rotate: [0, 270, 0],
          }}
          transition={{
            duration: 40,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 20
          }}
        />
        
        {/* Floating contact particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-400/40 to-purple-400/40 dark:from-pink-300/40 dark:to-purple-300/40 rounded-full"
            style={{
              left: `${20 + i * 16}%`,
              top: `${30 + i * 8}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.4, 1, 0.4],
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 4 + i * 0.6,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        ))}
      </div>
      
      <div className="container-max relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h2
            className="text-4xl md:text-5xl font-inter font-bold text-primary dark:text-white mb-4"
            variants={itemVariants}
          >
            Get In Touch
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Let's discuss your next project or just say hello
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-primary mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-700 dark:text-gray-300 font-lora leading-relaxed mb-8">
                I'm always excited to work on new projects and collaborate with amazing people. 
                Whether you have a question, want to discuss a project, or just want to say hi, 
                feel free to reach out!
              </p>
            </motion.div>

            {/* Contact Info Cards */}
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={info.title}
                  href={info.href}
                  className="flex items-center gap-4 p-4 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 transition-all duration-300 hover:shadow-xl hover:border-accent/50 dark:hover:border-accent/50 group relative overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03, 
                    x: 8,
                    y: -2,
                    rotateZ: index % 2 === 0 ? 1 : -1,
                    transition: { duration: 0.3 }
                  }}
                  transition={{ duration: 0.3 }}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <motion.div 
                    className="p-3 bg-accent/10 dark:bg-accent/20 rounded-lg text-accent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-300 relative z-10"
                    whileHover={{ 
                      rotate: 360,
                      scale: 1.1,
                      transition: { duration: 0.5 }
                    }}
                  >
                    {info.icon}
                  </motion.div>
                  <div className="relative z-10">
                    <h4 className="font-medium text-primary dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">{info.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Social Links */}
            <motion.div
              className="pt-6"
              variants={itemVariants}
            >
              <h4 className="font-medium text-primary dark:text-white mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <motion.a
                  href="https://github.com/Pseudo-Sid26"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-accent hover:border-accent transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github className="w-6 h-6" />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/siddhesh-chavan-a196a5252/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white dark:bg-gray-700 rounded-lg shadow-sm border border-gray-100 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:text-accent hover:border-accent transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin className="w-6 h-6" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg dark:shadow-gray-700/30 p-8 border border-gray-100 dark:border-gray-700 transition-all duration-300 group relative overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            whileHover={{
              scale: 1.02,
              y: -5,
              transition: { duration: 0.3 }
            }}
          >
            {/* Animated rotating border */}
            <div className="absolute inset-[-2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl">
              <div className="absolute inset-0 rotating-border rounded-xl"></div>
            </div>
            
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
            
            <motion.h3
              className="text-2xl font-semibold text-primary dark:text-white mb-6 relative z-10 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300"
              variants={itemVariants}
            >
              Send a Message
            </motion.h3>

            <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
              <motion.div variants={itemVariants}>
                <label htmlFor="name" className="block text-sm font-medium text-primary dark:text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md"
                  placeholder="Your full name"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="email" className="block text-sm font-medium text-primary dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 hover:border-gray-300 dark:hover:border-gray-500 hover:shadow-md"
                  placeholder="your.email@example.com"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="subject" className="block text-sm font-medium text-primary dark:text-white mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300"
                  placeholder="What's this about?"
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <label htmlFor="message" className="block text-sm font-medium text-primary dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                />
              </motion.div>

              {/* Submit Button */}
              <motion.div variants={itemVariants}>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full btn-primary flex items-center justify-center gap-2 ${
                    isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
                  }`}
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </motion.div>

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <motion.div
                  className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Thanks for your message! I'll get back to you soon.
                </motion.div>
              )}

              {submitStatus === 'error' && (
                <motion.div
                  className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Oops! Something went wrong. Please try again.
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>

        {/* Debug Panel (for development) */}
        {import.meta.env.DEV && (
          <motion.div
            className="mt-12 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Email Configuration Debug (Development Only)
            </h4>
            <div className="text-xs text-gray-600 dark:text-gray-400 space-y-1">
              <div className="font-medium text-blue-600 dark:text-blue-400">EmailJS:</div>
              <div>• Configured: {emailJSService.isConfigured() ? '✅' : '❌'}</div>
              <div>• Service ID: {import.meta.env.VITE_EMAILJS_SERVICE_ID ? '✅ Present' : '❌ Missing'}</div>
              <div>• Template ID: {import.meta.env.VITE_EMAILJS_TEMPLATE_ID ? '✅ Present' : '❌ Missing'}</div>
              <div>• Public Key: {import.meta.env.VITE_EMAILJS_PUBLIC_KEY ? '✅ Present' : '❌ Missing'}</div>
              
              <div className="mt-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-blue-700 dark:text-blue-300">
                <div className="font-medium">Setup Instructions:</div>
                <div>1. Sign up at https://emailjs.com (Free)</div>
                <div>2. Create service → Gmail/Outlook/etc</div>
                <div>3. Create email template</div>
                <div>4. Get credentials and update .env</div>
              </div>
              <div className="mt-2 text-blue-600 dark:text-blue-400">
                Check browser console for detailed email sending logs.
              </div>
              <button
                onClick={async () => {
                  const originalData = { ...formData };
                  const testData = {
                    name: "Portfolio Test User",
                    email: "siddhesh26pseudo@gmail.com", // Use your real email as sender
                    subject: "Portfolio Contact Form Test",
                    message: "This is a test message to verify your portfolio contact form is working correctly."
                  };
                  
                  // Temporarily set form data for testing
                  setFormData(testData);
                  
                  // Trigger email sending
                  setIsSubmitting(true);
                  setSubmitStatus('idle');

                  try {
                    console.log('=== DEBUG: Testing email functionality ===');
                    console.log('Test data:', testData);

                    let result = false;

                    // Try EmailJS
                    if (emailJSService.isConfigured()) {
                      console.log('DEBUG: Trying EmailJS...');
                      result = await emailJSService.sendEmail(testData);
                      console.log('DEBUG: EmailJS result:', result);
                    } else {
                      console.log('DEBUG: EmailJS not configured');
                    }

                    if (result) {
                      setSubmitStatus('success');
                      console.log('DEBUG: Test email sent successfully!');
                    } else {
                      setSubmitStatus('error');
                      console.log('DEBUG: Test email failed');
                    }
                  } catch (error) {
                    console.error('DEBUG: Test email error:', error);
                    setSubmitStatus('error');
                  } finally {
                    setIsSubmitting(false);
                    // Restore original form data after a delay
                    setTimeout(() => {
                      setFormData(originalData);
                      setSubmitStatus('idle');
                    }, 3000);
                  }
                }}
                className="mt-2 px-3 py-1 bg-blue-500 text-white text-xs rounded hover:bg-blue-600 transition-colors disabled:bg-blue-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Testing...' : 'Send Test Email'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Contact;
