"use client";
import { cn } from "@/lib/utils";
import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationControls,
} from "motion/react";

export const DraggableCardBody = ({
  className,
  children,
}) => {
  const cardRef = useRef(null);
  const controls = useAnimationControls();
  
  // OPTIMIZATION 1: Remove useVelocity hooks (expensive). 
  // We will get velocity directly from the onDragEnd event instead.
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // OPTIMIZATION 2: Lighter spring config
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };

  // Create smooth tilt values based on x/y
  const rotateX = useSpring(useTransform(y, [-100, 100], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-15, 15]), springConfig);

  // Simple opacity transforms
  const opacity = useTransform(x, [-200, 0, 200], [0.8, 1, 0.8]);
  
  // OPTIMIZATION 3: Store rect in state only on hover start, 
  // instead of calculating it 60 times a second.
  const [rect, setRect] = useState(null);
  const [constraints, setConstraints] = useState({ top: 0, left: 0, right: 0, bottom: 0 });

  useEffect(() => {
    const updateConstraints = () => {
       // Only run this on resize, not every frame
      if (typeof window !== "undefined") {
        setConstraints({
          top: -window.innerHeight / 2,
          left: -window.innerWidth / 2,
          right: window.innerWidth / 2,
          bottom: window.innerHeight / 2,
        });
      }
    };
    updateConstraints();
    window.addEventListener("resize", updateConstraints);
    return () => window.removeEventListener("resize", updateConstraints);
  }, []);

  const handleMouseEnter = (e) => {
    // Calculate size ONCE when mouse enters
    setRect(e.currentTarget.getBoundingClientRect());
  };

  const handleMouseMove = (e) => {
    // If we don't have the rect yet, don't do math
    if (!rect) return;

    // Pure math - no layout reading here (Much faster)
    const mouseX = e.clientX - rect.left - rect.width / 2;
    const mouseY = e.clientY - rect.top - rect.height / 2;

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setRect(null); // Clear rect to save memory
  };

  return (
    <motion.div
      ref={cardRef}
      drag
      dragConstraints={constraints}
      // OPTIMIZATION 4: Use 'layout' prop to let Framer handle transform logic efficiently
      layout
      onDragStart={() => {
        document.body.style.cursor = "grabbing";
      }}
      onDragEnd={(event, info) => {
        document.body.style.cursor = "default";
        
        // Reset tilt
        x.set(0);
        y.set(0);

        // OPTIMIZATION 5: Use info.velocity from the event instead of the hook
        const velocityX = info.velocity.x;
        const velocityY = info.velocity.y;
        
        // Simplified bounce logic
        const velocityMagnitude = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
        const bounce = Math.min(0.5, velocityMagnitude / 2000); // Capped bounce to prevent glitching

        controls.start({
          x: 0, // Snap back to center (optional, remove if you want them to stay)
          y: 0,
          transition: {
            type: "spring",
            bounce: bounce,
            stiffness: 100, 
            damping: 15
          }
        });
      }}
      style={{
        rotateX,
        rotateY,
        opacity,
        zIndex: x.get() !== 0 ? 50 : 1, // Bring to front while interacting
      }}
      animate={controls}
      whileHover={{ scale: 1.02 }}
      onMouseEnter={handleMouseEnter} // Trigger rect calculation
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "relative w-72 h-auto rounded-xl bg-neutral-100 dark:bg-neutral-900 shadow-2xl border border-white/10 touch-none", // touch-none helps mobile scroll performance
        className
      )}
    >
      {/* 3D Content Container */}
      <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>

      {/* Simplified Glare - CSS Gradient is cheaper than Motion Value opacity here */}
      <motion.div 
         style={{ 
            opacity: useTransform(x, [-150, 0, 150], [0.3, 0, 0.3]) 
         }}
         className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent z-50 rounded-xl" 
      />
    </motion.div>
  );
};

export const DraggableCardContainer = ({
  className,
  children,
}) => {
  return (
    <div className={cn("overflow-hidden [perspective:2000px]", className)}>
      {children}
    </div>
  );
};