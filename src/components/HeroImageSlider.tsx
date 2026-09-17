"use client";

import { useEffect, useState } from "react";

const slides = [
  { src: "/uploads/products/1789453520828-9daa24375963.jpg", alt: "Kashyap Engineering filling machinery" },
  { src: "/uploads/products/1789454102897-8e2735e48922.jpg", alt: "Kashyap Engineering packaging machinery" },
  { src: "/uploads/blog/1789449932379-58e4ba64e643.jpg", alt: "Kashyap Engineering production solution" },
  { src: "/uploads/blog/1789449974560-d18bfb9e2341.jpg", alt: "Kashyap Engineering industrial equipment" },
];

export default function HeroImageSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="absolute inset-y-0 right-0 -z-20 w-full overflow-hidden md:w-[62%]">
      {slides.map((slide, index) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${index === activeSlide ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div className="absolute bottom-24 right-6 z-10 flex gap-2 sm:right-10">
        {slides.map((slide, index) => (
          <button
            key={slide.src}
            type="button"
            aria-label={`Show hero image ${index + 1}`}
            aria-pressed={index === activeSlide}
            onClick={() => setActiveSlide(index)}
            className={`h-1.5 transition-all ${index === activeSlide ? "w-8 bg-[#c49a52]" : "w-3 bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
