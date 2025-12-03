import Image from "next/image";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/home/HeroSection";
import MarqueeSection from "@/components/home/MarqueeSection";
import BentoGrid from "@/components/home/BentoGrid";
import StatementSection from "@/components/home/StatementSection";
export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <MarqueeSection />
      <BentoGrid />
      <StatementSection />
    </>
  );
}
