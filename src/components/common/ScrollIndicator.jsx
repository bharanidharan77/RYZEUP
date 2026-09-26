import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function ScrollIndicator({ label = "SCROLL DOWN" }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight * 0.45,
      behavior: 'smooth'
    });
  };

  if (scrolled) return null;

  return (
    <div 
      className="scroll-indicator-container" 
      onClick={scrollToContent} 
      title="Scroll down to explore"
    >
      <div className="scroll-mouse">
        <div className="scroll-wheel" />
      </div>
      <span className="scroll-text">{label}</span>
      <ChevronDown size={14} style={{ color: 'var(--accent-cyan)' }} />
    </div>
  );
}
