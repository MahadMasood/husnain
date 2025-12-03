// components/MarqueeSection.jsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MarqueeSection() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const xPercentRef = useRef(0);
  const rafRef = useRef(null);
  let direction = -1;

  useEffect(() => {
    const animation = () => {
      if (xPercentRef.current <= -100) xPercentRef.current = 0;
      if (xPercentRef.current > 0) xPercentRef.current = -100;
      
      gsap.set(firstText.current, { xPercent: xPercentRef.current });
      gsap.set(secondText.current, { xPercent: xPercentRef.current });
      
      xPercentRef.current += 0.08 * direction; // Adjust speed here
      rafRef.current = requestAnimationFrame(animation);
    };

    rafRef.current = requestAnimationFrame(animation);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="relative overflow-hidden bg-black text-white py-4 border-y border-white/10">
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-r from-black via-transparent to-black pointer-events-none" />
      <div ref={slider} className="relative flex whitespace-nowrap">
        <MarqueeText ref={firstText} />
        <MarqueeText ref={secondText} />
      </div>
    </div>
  );
}

const MarqueeText = ({ ref }) => (
  <p ref={ref} className="text-[4rem] font-black uppercase leading-none tracking-tighter pr-12 opacity-90">
    Fall Winter 2025 • Available Now • Worldwide Shipping • No Restocks •
  </p>
);