import { useEffect } from 'react';
import './ProximityReactions.css';

const ProximityReactions = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const header = document.querySelector('header');
      if (header) {
        const rect = header.getBoundingClientRect();
        document.body.style.setProperty('--mx', (e.clientX - rect.left - rect.width / 2).toString());
        document.body.style.setProperty('--my', (e.clientY - rect.top - rect.height / 2).toString());
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="proximity-reactions-container">
      <div className="baseLight"></div>
      <div className="shadows">
        {[...Array(12)].map((_, i) => (
          <div className="shadow" style={{ '--i': i } as React.CSSProperties} key={`shadow-${i}`}></div>
        ))}
      </div>
      <div className="balls">
        {[...Array(12)].map((_, i) => (
          <div className="ball" style={{ '--i': i } as React.CSSProperties} key={`ball-${i}`}></div>
        ))}
      </div>
    </div>
  );
};

export default ProximityReactions;
