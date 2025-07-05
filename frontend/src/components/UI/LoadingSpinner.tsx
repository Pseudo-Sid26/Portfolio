import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white dark:bg-gray-900 transition-colors flex items-center justify-center z-50">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-accent/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
      
      <motion.div
        className="relative"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Outer ring */}
        <motion.div
          className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Middle ring */}
        <motion.div
          className="absolute top-2 left-2 w-16 h-16 border-4 border-accent/50 border-t-transparent rounded-full"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Inner ring */}
        <motion.div
          className="absolute top-4 left-4 w-12 h-12 border-4 border-accent border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Center dot */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-3 h-3 bg-accent rounded-full transform -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        <motion.p
          className="mt-8 text-primary dark:text-white font-medium text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            Loading
          </motion.span>
          <motion.span
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
          >
            ...
          </motion.span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default LoadingSpinner;
