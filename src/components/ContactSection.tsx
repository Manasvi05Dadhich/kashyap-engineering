export default function ContactSection() {
  return (
    <section className="border-t border-[#D8D3C8] bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-2xl font-bold text-[#1C2024]">Contact us</h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#5B6472]">
            Have a project in mind, or need a quote on a filling line? Reach
            out and our team will get back to you.
          </p>
          <dl className="mt-6 space-y-3 text-sm">
            <div>
              <dt className="font-medium text-[#1C2024]">Phone</dt>
              <dd className="text-[#5B6472]">(+91) 97270 59812</dd>
            </div>
            <div>
              <dt className="font-medium text-[#1C2024]">Email</dt>
              <dd className="text-[#5B6472]">saleskashyapengineering@gmail.com</dd>
            </div>
            <div>
              <dt className="font-medium text-[#1C2024]">Address</dt>
              <dd className="text-[#5B6472]">
                485-486/A-33, Ashtamangal Industrial Park, G.I.D.C., Makarpura,
                Vadodara-390010, Gujarat, India
              </dd>
            </div>
          </dl>
        </div>
        <div className="h-72 w-full overflow-hidden border border-[#D8D3C8] md:h-full">
          <iframe
            title="Kashyap Engineering location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.6738387100586!2d73.1755425743432!3d22.25245064462992!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5e438024947%3A0x1f11566337e95794!2sKashyap%20Engineering!5e0!3m2!1sen!2sin!4v1705995261446!5m2!1sen!2sin"
            className="h-full w-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
