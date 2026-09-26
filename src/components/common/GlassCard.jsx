import React from 'react';

export default function GlassCard({ 
  children, 
  className = '', 
  hoverEffect = false, 
  theme = '', 
  style = {}, 
  onClick 
}) {
  const themeClass = theme ? `glass-panel-hover-${theme}` : '';
  const hoverClass = hoverEffect ? `glass-panel-hover ${themeClass}` : '';

  return (
    <div
      className={`glass-panel ${hoverClass} ${className}`.trim()}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
