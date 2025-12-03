// components/MarqueeSection.jsx
"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MarqueeSection() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  useEffect(() => {
    requestAnimationFrame(animation);
  }, []);

  const animation = () => {
    if (xPercent <= -100) xPercent = 0;
    if (xPercent > 0) xPercent = -100;
    
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    
    xPercent += 0.08 * direction; // Adjust speed here
    requestAnimationFrame(animation);
  };

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