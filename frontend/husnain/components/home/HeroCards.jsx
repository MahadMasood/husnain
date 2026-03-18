import React from "react";
import CardSwap, { Card } from '../ui/CardSwap';
import Image from "next/image";

const CARD_W = 440;
const CARD_H = 520;

const HeroCards = () => {
  const cards = [
    { src: "/hero/hero1.jpg", label: "New Arrivals", tag: "Fall 2025" },
    { src: "/hero/hero2.jpg", label: "Kids Collection", tag: "Ages 2–14" },
    { src: "/hero/hero3.jpg", label: "Essentials", tag: "All Season" },
  ];

  return (
    <div
      className="relative w-full h-full flex items-center justify-center overflow-visible"
      style={{ perspective: "900px" }}
    >
      <CardSwap
        width={CARD_W}
        height={CARD_H}
        cardDistance={40}
        verticalDistance={50}
        delay={4000}
        pauseOnHover={true}
        skewAmount={4}
      >
        {cards.map(({ src, label, tag }) => (
          <Card key={label}>
            <div className="relative w-full h-full">
              <Image
                src={src}
                alt={label}
                fill
                sizes="340px"
                className="object-cover"
                priority
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              {/* Labels */}
              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                <span className="text-white font-black text-lg tracking-tight drop-shadow-lg">{label}</span>
                <span className="bg-amber-500 text-white font-mono text-xs px-2 py-1 rounded-full">{tag}</span>
              </div>
            </div>
          </Card>
        ))}
      </CardSwap>
    </div>
  );
};

export default HeroCards;