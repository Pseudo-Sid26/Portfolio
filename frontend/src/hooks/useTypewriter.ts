import { useState, useEffect } from 'react';

export const useTypewriter = (words: string[], speed = 100, deleteSpeed = 50, delayBetweenWords = 2000) => {
  const [displayText, setDisplayText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Word is complete, start deleting after delay
          setTimeout(() => setIsDeleting(true), delayBetweenWords);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(currentWord.slice(0, displayText.length - 1));
        } else {
          // Word is deleted, move to next word
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? deleteSpeed : speed);

    return () => clearTimeout(timeout);
  }, [displayText, wordIndex, isDeleting, words, speed, deleteSpeed, delayBetweenWords]);

  return displayText;
};
