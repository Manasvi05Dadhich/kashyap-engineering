export default function ContactSection() {
  return (
    <section className="border-y border-[#e3d8ca] bg-[#f5efe7] text-[#1c2024]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-[.82fr_1.18fr] md:items-stretch lg:px-10 lg:py-24">
        <div className="reveal-up flex flex-col justify-center">
          <p className="text-xs font-bold uppercase tracking-[.2em] text-[#8b2d2d]">Let&apos;s build your next line</p>
          <h2 className="mt-3 max-w-md font-display text-4xl font-extrabold tracking-[-.04em] text-[#4d1414] sm:text-5xl">Ready to improve production?</h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#5f5a55]">
            Have a project in mind, or need a quote on a filling line? Reach
            out and our team will get back to you.
          </p>
          <dl className="mt-8 grid max-w-md gap-5 border-t border-[#d8cbbb] pt-6 text-sm sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8b2d2d]">Phone</dt>
              <dd className="mt-1 font-semibold text-[#1c2024]">(+91) 97270 59812</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8b2d2d]">Email</dt>
              <dd className="mt-1 break-words text-[#5f5a55]">saleskashyapengineering@gmail.com</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-[.16em] text-[#8b2d2d]">Visit us</dt>
              <dd className="mt-1 leading-6 text-[#5f5a55]">
                485-486/A-33, Ashtamangal Industrial Park, G.I.D.C., Makarpura,
                Vadodara-390010, Gujarat, India
              </dd>
            </div>
          </dl>
        </div>
        <div className="reveal-soft relative min-h-[360px] overflow-hidden border-8 border-white bg-[#d8d3c8] shadow-[0_18px_45px_rgba(77,20,20,.12)] md:min-h-[480px] [animation-delay:180ms]">
          <iframe
            title="Kashyap Engineering location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.6738387100586!2d73.1755425743432!3d22.25245064462992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5e438024947%3A0x1f11566337e95794!2sKashyap%20Engineering!5e0!3m2!1sen!2sin!4v1705995261446!5m2!1sen!2sin"
            className="h-full w-full border-0"
            loading="lazy"
          />
          <div className="pointer-events-none absolute bottom-5 left-5 max-w-[230px] border-l-4 border-[#c49a52] bg-[#4d1414]/95 px-4 py-3 text-white shadow-lg">
            <p className="text-[10px] font-bold uppercase tracking-[.16em] text-[#e2bd72]">Find our workshop</p>
            <p className="mt-1 text-sm font-semibold leading-5">Ashtamangal Industrial Park, Vadodara</p>
          </div>
        </div>
      </div>
    </section>
  );
}
