import React from "react";
import CardSwap, { Card } from '../ui/CardSwap'
import Image from "next/image";

const HeroCards = () => {
  return (
    <div className="h-full w-full">
      <CardSwap
        width="70%"
        height="auto"
        cardDistance={60}
        verticalDistance={70}
        delay={5000}
        pauseOnHover={false}
      >
        <Card>
          <h3 className="text-white font-mono text-lg mb-2">PROTOCOL_01</h3>
          <Image
            src="/hero/hero1.jpg"
            alt="Protocol 1"
            width={800}
            height={500}
            sizes="(max-width: 768px) 100vw, 800px"
            loading="lazy"
          />
        </Card>
        <Card>
          <h3 className="text-white font-mono text-lg mb-2">PROTOCOL_02</h3>
          <Image
            src="/hero/hero2.jpg"
            alt="Protocol 2"
            width={800}
            height={500}
            sizes="(max-width: 768px) 100vw, 800px"
            loading="lazy"
          />
        </Card>
        <Card>
          <h3 className="text-white font-mono text-lg mb-2">PROTOCOL_03</h3>
          <Image
            src="/hero/hero3.jpg"
            alt="Protocol 3"
            width={800}
            height={500}
            sizes="(max-width: 768px) 100vw, 800px"
            loading="lazy"
          />
        </Card>
      </CardSwap>
    </div>
  );
};

export default HeroCards;