import { useState, useEffect } from 'react';

interface TypingTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function TypingText({ text, speed = 100, delay = 0, className = '' }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [index, setIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const startTyping = setTimeout(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        setIndex(index + 1);
      } else {
        setShowCursor(false);
      }
    }, delay);

    return () => clearTimeout(startTyping);
  }, [index, text, speed, delay]);

  useEffect(() => {
    if (index < text.length) {
      const timer = setTimeout(() => {
        setIndex(index + 1);
      }, speed);
      return () => clearTimeout(timer);
    }
  }, [index, speed, text.length]);

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span className="typing-cursor"></span>}
    </span>
  );
}