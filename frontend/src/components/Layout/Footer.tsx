import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';
import type { UserProfile } from '../../types';

interface FooterProps {
  profile: UserProfile;
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-primary dark:bg-gray-900 text-white section-padding transition-colors relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-5">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute bottom-10 left-10 w-24 h-24 bg-white rounded-full"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>
      
      <div className="container-max relative z-10">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-inter font-bold mb-2">
                {profile.name}
              </h3>
              <p className="text-gray-300 dark:text-gray-400 font-lora">
                {profile.title}
              </p>
            </motion.div>

            <motion.p
              className="text-gray-300 dark:text-gray-400 font-lora leading-relaxed mb-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Creating digital experiences that make a difference. 
              Let's build something amazing together.
            </motion.p>

            {/* Social Links */}
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {profile.socialLinks.github && (
                <motion.a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-accent hover:text-white text-gray-300 dark:text-gray-400 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Github size={20} />
                </motion.a>
              )}
              {profile.socialLinks.linkedin && (
                <motion.a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-white/10 hover:bg-accent hover:text-white text-gray-300 dark:text-gray-400 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.1, rotate: -5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Linkedin size={20} />
                </motion.a>
              )}
              <motion.a
                href={`mailto:${profile.email}`}
                className="p-3 bg-white/10 hover:bg-accent hover:text-white text-gray-300 dark:text-gray-400 rounded-lg transition-all duration-300"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
              </motion.a>
            </motion.div>
          </div>

          {/* Navigation */}
          <div>
            <motion.h4
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Quick Links
            </motion.h4>
            <motion.ul
              className="space-y-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {navigation.map((item) => (
                <li key={item.name}>
                  <motion.a
                    href={item.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                    className="text-gray-300 dark:text-gray-400 hover:text-accent transition-colors duration-300 cursor-pointer"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.name}
                  </motion.a>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* Contact Info */}
          <div>
            <motion.h4
              className="text-lg font-semibold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Get in Touch
            </motion.h4>
            <motion.div
              className="space-y-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-gray-300 dark:text-gray-400">
                <a 
                  href={`mailto:${profile.email}`}
                  className="hover:text-accent transition-colors duration-300"
                >
                  {profile.email}
                </a>
              </p>
              <p className="text-gray-300 dark:text-gray-400">{profile.location}</p>
              <p className="text-gray-300 dark:text-gray-400 font-lora text-sm">
                Available for freelance projects and full-time opportunities
              </p>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="flex items-center gap-2 text-gray-300 dark:text-gray-400 text-sm">
            <span>© {currentYear} {profile.name}. Made with</span>
            <Heart size={16} className="text-red-400 fill-current" />
            <span>and lots of coffee.</span>
          </div>

          {/* Back to Top Button */}
          <motion.button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-gray-300 dark:text-gray-400 hover:text-accent transition-colors duration-300 text-sm"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Back to top</span>
            <ArrowUp size={16} />
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
