import React, { useState, useEffect } from 'react';

const AsciiArtDisplay = ({ 
  art, 
  maxWidth = '100%',
  maxHeight = '400px',
  align = 'left',  // can be 'left', 'center', or 'right'
  padding = '0'    // optional padding
}) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const container = document.getElementById('ascii-container');
      if (container) {
        const preElement = container.querySelector('pre');
        if (preElement) {
          const textWidth = preElement.scrollWidth;
          const containerWidth = container.clientWidth;
          const newScale = Math.min(1, containerWidth / textWidth);
          setScale(newScale);
        }
      }
    };

    calculateScale();
    window.addEventListener('resize', calculateScale);
    return () => window.removeEventListener('resize', calculateScale);
  }, [art]);

  // Remove any common leading whitespace from all lines
  const normalizedArt = React.useMemo(() => {
    const lines = art.split('\n');
    const minIndent = Math.min(
      ...lines
        .filter(line => line.trim())
        .map(line => line.match(/^\s*/)[0].length)
    );
    return lines
      .map(line => line.slice(minIndent))
      .join('\n');
  }, [art]);

  // Calculate alignment classes
  const alignmentClass = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end'
  }[align] || 'justify-start';

  return (
    <div 
      id="ascii-container"
      className={`flex ${alignmentClass} w-full overflow-hidden`}
      style={{ maxWidth, maxHeight, padding }}
    >
      <div 
        className="font-mono whitespace-pre bg-white text-black"
        style={{ 
          transform: `scale(${scale})`,
          transformOrigin: `${align === 'right' ? 'right' : 'left'} top`,
          width: scale < 1 ? `${(100 / scale)}%` : '100%',
          lineHeight: '1',
          letterSpacing: '0',
          fontSize: '10px'
        }}
      >
        <pre className="m-0 p-0">
          {normalizedArt}
        </pre>
      </div>
    </div>
  );
};

export default AsciiArtDisplay;