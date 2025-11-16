import React, { useRef, useEffect, ReactNode } from 'react';
import './ProximityReactions.css';

interface ProximityReactionsProps {
  children: ReactNode;
}

const ProximityReactions: React.FC<ProximityReactionsProps> = ({ children }) => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const glow = wrapper.querySelector('.proximity-glow') as HTMLDivElement;
      if (glow) {
        glow.style.setProperty('--x', `${x}px`);
        glow.style.setProperty('--y', `${y}px`);
      }

      const content = wrapper.querySelector('.proximity-content') as HTMLDivElement;
      if(content) {
          const moveX = (x - rect.width / 2) / 10;
          const moveY = (y - rect.height / 2) / 10;
          content.style.transform = `translate(${moveX}px, ${moveY}px)`;
      }
    };

    const handleMouseLeave = () => {
        const content = wrapper.querySelector('.proximity-content') as HTMLDivElement;
        if(content){
            content.style.transform = 'translate(0, 0)';
        }
    };

    wrapper.addEventListener('mousemove', handleMouseMove);
    wrapper.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      wrapper.removeEventListener('mousemove', handleMouseMove);
      wrapper.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="proximity-wrapper" ref={wrapperRef}>
      <div className="proximity-glow"></div>
      <div className="proximity-content">{children}</div>
    </div>
  );
};

export default ProximityReactions;
