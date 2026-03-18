"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function MarqueeSection() {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const xPercentRef = useRef(0);
  const rafRef = useRef(null);
  const direction = -1;

  useEffect(() => {
    const animation = () => {
      if (xPercentRef.current <= -100) xPercentRef.current = 0;
      if (xPercentRef.current > 0) xPercentRef.current = -100;
      gsap.set(firstText.current, { xPercent: xPercentRef.current });
      gsap.set(secondText.current, { xPercent: xPercentRef.current });
      xPercentRef.current += 0.08 * direction;
      rafRef.current = requestAnimationFrame(animation);
    };
    rafRef.current = requestAnimationFrame(animation);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  return (
    <div className="relative overflow-hidden bg-amber-600 text-white py-4">
      <div className="absolute top-0 left-0 w-full h-full z-10 bg-gradient-to-r from-amber-600 via-transparent to-amber-600 pointer-events-none" />
      <div className="relative flex whitespace-nowrap">
        <MarqueeText ref={firstText} />
        <MarqueeText ref={secondText} />
      </div>
    </div>
  );
}

const MarqueeText = ({ ref }) => (
  <p ref={ref} className="text-[3rem] font-black uppercase leading-none tracking-tighter pr-12">
    Fall Winter 2025 • New Kids Collection • Worldwide Shipping • Premium Quality • Free Returns •
  </p>
);
