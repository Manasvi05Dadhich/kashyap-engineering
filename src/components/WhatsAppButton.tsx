const whatsappUrl = "https://wa.me/919727059812?text=Hello%20Kashyap%20Engineering%2C%20I%20have%20a%20packaging%20requirement.";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Kashyap Engineering on WhatsApp"
      title="Chat on WhatsApp"
      className="group fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_24px_rgba(37,211,102,.35)] transition hover:-translate-y-1 hover:bg-[#128C7E] sm:bottom-7 sm:right-7"
    >
      <span className="text-[11px] font-extrabold tracking-[-.06em]" aria-hidden="true">WA</span>
    </a>
  );
}