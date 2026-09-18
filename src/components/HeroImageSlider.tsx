"use client";

import { useEffect, useState } from "react";

export const slides = [
  {
    src: "/uploads/products/1789453520828-9daa24375963.jpg",
    alt: "Kashyap Engineering filling machinery",
    title: "Precision machinery for better production.",
    description: "Reliable liquid, oil, bottle and tube filling systems engineered for your line, your product and your next stage of growth.",
  },
  {
    src: "/uploads/products/1789454102897-8e2735e48922.jpg",
    alt: "Kashyap Engineering packaging machinery",
    title: "Packaging systems built around your line.",
    description: "From accurate filling to dependable packing, we make production smoother, faster and easier to scale.",
  },
  {
    src: "/uploads/blog/1789449932379-58e4ba64e643.jpg",
    alt: "Kashyap Engineering production solution",
    title: "Engineering that keeps production moving.",
    description: "Practical automation and responsive support for manufacturers who cannot afford unnecessary downtime.",
  },
  {
    src: "/uploads/blog/1789449974560-d18bfb9e2341.jpg",
    alt: "Kashyap Engineering industrial equipment",
    title: "Your next stage of growth starts here.",
    description: "Talk to our team about machinery that fits your product, your process and the way you want to grow.",
  },
];

type HeroImageSliderProps = {
  onSlideChange: (index: number) => void;
};

export default function HeroImageSlider({ onSlideChange }: HeroImageSliderProps) {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => {
        const nextSlide = (current + 1) % slides.length;
        onSlideChange(nextSlide);
        return nextSlide;
      });
    }, 3500);

    return () => window.clearInterval(timer);
  }, [onSlideChange]);

  return (
    <div className="absolute inset-0 -z-20 w-full overflow-hidden">
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
            onClick={() => {
              setActiveSlide(index);
              onSlideChange(index);
            }}
            className={`h-1.5 transition-all ${index === activeSlide ? "w-8 bg-[#c49a52]" : "w-3 bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}
