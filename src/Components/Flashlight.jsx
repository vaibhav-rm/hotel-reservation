import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Flashlight = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Use motion values for smooth animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Apply spring to smooth the animation
  const springConfig = { damping: 25, stiffness: 500 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);

  // Capture mouse position
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Update the motion values with the mouse position
  useEffect(() => {
    x.set(mousePosition.x);
    y.set(mousePosition.y);
  }, [mousePosition]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50, // Ensure it's above other content
      }}
    >
      {/* Use motion.div for smooth animation */}
      <motion.div
        style={{
          position: 'absolute',
          left: mouseX.get() - 50, // Offset for centering the circle on the mouse
          top: mouseY.get() - 50,
          width: '100px', // Size of the flashlight circle
          height: '100px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.3)', // White light with transparency
          boxShadow: '0 0 50px rgba(255, 255, 255, 0.4)', // Glow effect
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};

export default Flashlight;
