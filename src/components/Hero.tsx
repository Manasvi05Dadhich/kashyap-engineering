import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

function MachineSketch({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 380" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M72 303h366l-18 31H52z" /><path d="M88 294h352l-10 14H78z" />
        <rect x="138" y="90" width="252" height="204" rx="3" /><rect x="154" y="108" width="220" height="175" />
        <path d="M163 124h202v35H163zM180 132h168v20H180zM181 171v99m73-99v99m72-99v99M175 194h185m-185 43h185" />
        <path d="M392 126h67v153h-67zM401 143h49v27h-49z" />
        <circle cx="414" cy="196" r="5" /><circle cx="432" cy="196" r="5" /><circle cx="450" cy="196" r="5" />
        <path d="M108 76h294l-12 17H96zM118 93v201m284-201v201M222 76V44h116v32m-58-32V22M112 334v19m299-19v19M182 334v19m159-19v19" />
      </g>
      <g fill="currentColor"><circle cx="414" cy="196" r="2" /><circle cx="432" cy="196" r="2" /><circle cx="450" cy="196" r="2" /></g>
    </svg>
  );
}

function DetailCard({ className, label, variant, imageUrl, imageAlt }: { className: string; label: string; variant: "frame" | "line"; imageUrl?: string; imageAlt?: string }) {
  return (
    <div className={`absolute z-10 hidden w-44 border border-[#D8D3C8] bg-white p-3 shadow-[0_14px_34px_rgba(31,58,95,.12)] sm:block ${className}`}>
      <div className="relative h-28 overflow-hidden border border-[#E7E2D8] bg-[#F7F5F1] text-[#1F3A5F]">
        {imageUrl ? <Image src={imageUrl} alt={imageAlt ?? label} fill className="object-cover" sizes="176px" /> : variant === "frame" ? <><div className="absolute left-5 top-7 h-14 w-24 border-2 border-current" /><div className="absolute left-9 top-10 h-8 w-16 border border-current" /><div className="absolute right-5 top-4 h-20 w-3 border border-current" /><div className="absolute bottom-4 left-4 h-px w-32 bg-current" /></> : <><div className="absolute left-5 top-12 h-px w-28 rotate-[-20deg] bg-current" /><div className="absolute left-12 top-6 h-16 w-16 rounded-full border border-current" /><div className="absolute left-[70px] top-[22px] h-12 w-px rotate-[35deg] bg-current" /><div className="absolute bottom-5 left-5 h-px w-28 bg-current" /></>}
      </div>
      <p className="mt-2 font-mono text-[9px] uppercase tracking-[.14em] text-[#6B7480]">{label}</p>
    </div>
  );
}

export default async function Hero() {
  let products = [];
  try {
    products = await prisma.product.findMany({
      where: { featured: true },
      include: { images: { take: 4, orderBy: { order: "asc" } } },
      orderBy: { order: "asc" },
      take: 4,
    });
  } catch {
    // Keep the public hero available while a local database tunnel is offline.
  }
  const imageCards = products.flatMap((product) => product.images.map((image) => ({ url: image.url, alt: image.alt ?? product.name }))).slice(0, 4);

  return (
    <section className="relative isolate min-h-[calc(100svh-73px)] overflow-hidden bg-white text-[#1C2024]">
      <div className="absolute inset-0 -z-10 opacity-70 [background-image:linear-gradient(135deg,transparent_49.8%,#E7E9E6_50%,transparent_50.2%),linear-gradient(25deg,transparent_49.8%,#EEF0ED_50%,transparent_50.2%)] [background-position:18% 18%,78% 64%] [background-size:520px_360px,430px_300px]" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[640px] w-[640px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#EEF0ED] opacity-80" />
      <div className="absolute left-1/2 top-1/2 -z-10 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-[#E5E7E4]" />
      <div className="mx-auto flex min-h-[calc(100svh-73px)] max-w-7xl items-center justify-center px-6 py-20 text-center sm:py-24">
        <div className="relative z-20 max-w-3xl">
          <p className="flex items-center justify-center gap-3 font-mono text-[10px] font-semibold tracking-[.2em] text-[#1F3A5F]"><span className="h-px w-8 bg-[#1F3A5F]" />ENGINEERED FOR PRECISION<span className="h-px w-8 bg-[#1F3A5F]" /></p>
          <h1 className="mt-6 font-display text-5xl font-bold leading-[.96] tracking-[-.055em] text-[#1C2024] sm:text-6xl lg:text-8xl">Machines that keep<br />production <span className="text-[#1F3A5F]">moving.</span></h1>
          <p className="mx-auto mt-7 max-w-xl text-base leading-7 text-[#5B6472] sm:text-lg">Liquid, oil, bottle and tube filling machinery, built around your production requirements and supported from Vadodara, India.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3"><Link href="/products" className="inline-flex min-h-12 items-center gap-6 bg-[#1268D4] px-6 text-xs font-bold uppercase tracking-[.1em] text-white shadow-[0_9px_20px_rgba(18,104,212,.18)] transition hover:-translate-y-0.5 hover:bg-[#1F3A5F]">Explore machines <span className="text-lg font-normal">↓</span></Link><Link href="/contact" className="inline-flex min-h-12 items-center border border-[#E1E3E0] bg-white px-6 text-xs font-bold uppercase tracking-[.1em] text-[#1268D4] transition hover:border-[#1268D4]">Request a quote <span className="ml-2 text-base">→</span></Link></div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 top-0" aria-hidden="true">
          <DetailCard className="left-[3%] top-[24%] rotate-[-5deg]" label="FILLING SYSTEM / 01" variant="frame" imageUrl={imageCards[0]?.url} imageAlt={imageCards[0]?.alt} />
          <DetailCard className="right-[3%] top-[22%] rotate-[5deg]" label="CONTROL UNIT / 02" variant="line" imageUrl={imageCards[1]?.url} imageAlt={imageCards[1]?.alt} />
          <DetailCard className="bottom-[12%] left-[8%] rotate-[4deg]" label="CONVEYOR LINE / 03" variant="line" imageUrl={imageCards[2]?.url} imageAlt={imageCards[2]?.alt} />
          <DetailCard className="bottom-[10%] right-[8%] rotate-[-4deg]" label="PACKAGING CELL / 04" variant="frame" imageUrl={imageCards[3]?.url} imageAlt={imageCards[3]?.alt} />
          <div className="absolute bottom-[-5%] left-1/2 w-[650px] -translate-x-1/2 text-[#1F3A5F] opacity-[.12] sm:w-[760px]"><MachineSketch /></div>
        </div>
      </div>
      <div className="absolute bottom-7 left-6 flex gap-7 border-l border-[#1F3A5F]/40 pl-3 sm:left-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]"><div><strong className="block text-xl tracking-[-.06em] text-[#1C2024]">26+</strong><span className="font-mono text-[9px] uppercase tracking-[.1em] text-[#6B7480]">Years experience</span></div><div><strong className="block text-xl tracking-[-.06em] text-[#1C2024]">ISO</strong><span className="font-mono text-[9px] uppercase tracking-[.1em] text-[#6B7480]">9001:2015</span></div><div className="hidden sm:block"><strong className="block text-xl tracking-[-.06em] text-[#1C2024]">02</strong><span className="font-mono text-[9px] uppercase tracking-[.1em] text-[#6B7480]">Countries served</span></div></div>
      <span className="absolute bottom-8 right-6 font-mono text-[10px] tracking-[.14em] text-[#1F3A5F] lg:right-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]">01 <span className="mx-1 text-[#1268D4]">/</span> 06</span>
    </section>
  );
}