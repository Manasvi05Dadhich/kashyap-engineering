export default function Footer() {
  return (
    <footer className="border-t border-[#D8D3C8] bg-[#1C2024] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-6 text-sm text-[#B7BDC6] md:flex-row md:items-center">
        <p>© {new Date().getFullYear()} Kashyap Engineering. All rights reserved.</p>
        <p>Vadodara, Gujarat, India</p>
      </div>
    </footer>
  );
}
