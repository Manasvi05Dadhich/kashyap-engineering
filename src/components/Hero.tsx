"use client";

import { useState } from "react";
import Link from "next/link";
import HeroImageSlider, { slides } from "@/components/HeroImageSlider";

export default function Hero() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  return (
    <section className="relative isolate overflow-hidden bg-[#073b72] text-white">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(77,20,20,.98)_0%,rgba(77,20,20,.78)_46%,rgba(77,20,20,.18)_100%)]" />
      <HeroImageSlider onSlideChange={setActiveSlide} />
      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center px-6 py-24 lg:grid-cols-[.95fr_1.05fr] lg:px-10">
        <div key={slide.src} className="relative z-10 max-w-2xl">
          <p className="reveal-up mb-5 text-xs font-bold uppercase tracking-[.24em] text-[#e2bd72]">Kashyap Engineering · Vadodara</p>
          <h1 className="reveal-up font-display text-5xl font-extrabold leading-[1.02] tracking-[-.04em] [animation-delay:100ms] sm:text-6xl lg:text-7xl">{slide.title}</h1>
          <p className="reveal-up mt-7 max-w-lg text-base leading-7 text-blue-50/85 [animation-delay:200ms] sm:text-lg">{slide.description}</p>
          <div className="reveal-up mt-9 flex flex-wrap gap-3 [animation-delay:300ms]"><Link href="/products" className="inline-flex min-h-12 items-center gap-4 bg-[#c49a52] px-6 text-xs font-bold uppercase tracking-[.12em] text-[#4d1414] transition hover:bg-white">Explore products <span className="text-lg">→</span></Link><Link href="/contact" className="inline-flex min-h-12 items-center gap-4 border border-white/60 px-6 text-xs font-bold uppercase tracking-[.12em] text-white transition hover:border-white hover:bg-white hover:text-[#4d1414]">Enquire now <span className="text-lg">→</span></Link></div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-[#c49a52] text-[#4d1414]"><div className="stagger-grid mx-auto grid max-w-7xl grid-cols-2 gap-5 px-6 py-4 text-center sm:grid-cols-4 lg:px-10"><div><strong className="block font-display text-2xl font-extrabold">26+</strong><span className="text-[10px] font-bold uppercase tracking-[.12em]">Years experience</span></div><div><strong className="block font-display text-2xl font-extrabold">500+</strong><span className="text-[10px] font-bold uppercase tracking-[.12em]">Machines delivered</span></div><div><strong className="block font-display text-2xl font-extrabold">3+</strong><span className="text-[10px] font-bold uppercase tracking-[.12em]">Countries served</span></div><div><strong className="block font-display text-2xl font-extrabold">24/7</strong><span className="text-[10px] font-bold uppercase tracking-[.12em]">Technical support</span></div></div></div>
    </section>
  );
}