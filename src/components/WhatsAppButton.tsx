const whatsappUrl = "https://wa.me/919727059812?text=Hello%20Kashyap%20Engineering%2C%20I%20have%20a%20packaging%20requirement.";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Kashyap Engineering on WhatsApp"
      title="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 inline-flex h-12 items-center gap-3 border border-[#1F3A5F] bg-[#1F3A5F] px-3 text-white shadow-[0_10px_24px_rgba(31,58,95,.2)] transition hover:-translate-y-1 hover:bg-[#1268D4] sm:bottom-7 sm:right-7 sm:px-4"
    >
      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/60 text-[11px] font-bold tracking-[-.05em]" aria-hidden="true">WA</span>
      <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-[.12em] sm:inline">WhatsApp</span>
      <span className="text-base text-[#BFD7F2] transition group-hover:text-white" aria-hidden="true">↗</span>
    </a>
  );
}