"use client";

import { useCallback } from "react";
import HeroOpenPaw from "@/components/sections/HeroOpenPaw";
import ProblemStrip from "@/components/sections/ProblemStrip";
import ProductReveal from "@/components/sections/ProductReveal";
import SensorMap from "@/components/sections/SensorMap";
import SDKPlayground from "@/components/sections/SDKPlayground";
import CommunityRoadmap from "@/components/sections/CommunityRoadmap";
import PricingTable from "@/components/sections/PricingTable";
import VIPGate from "@/components/sections/VIPGate";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/sections/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";

export default function Home() {
  const scrollToVIP = useCallback(() => {
    const el = document.getElementById("vip");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <main>
      <HeroOpenPaw onReserveClick={scrollToVIP} />
      <ProblemStrip />
      <ProductReveal />
      <SensorMap />
      <SDKPlayground />
      <CommunityRoadmap />
      <PricingTable onReserveClick={scrollToVIP} />
      <VIPGate />
      <FAQ />
      <Footer />
      <StickyMobileBar />
    </main>
  );
}
