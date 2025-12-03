// components/StatementSection.jsx
export default function StatementSection() {
  return (
    <section className="bg-black text-white py-32 px-6 flex flex-col items-center justify-center text-center">
      <p className="text-sm font-mono text-[#FF3B30] mb-6 uppercase tracking-widest">
        Est. 2025 — Tokyo / New York
      </p>
      <h2 className="max-w-4xl text-3xl md:text-6xl font-medium leading-tight tracking-tight">
        "WE DESIGN FOR THE <span className="text-[#888]">NOISE</span> IN THE SIGNAL. 
        CLOTHING IS NOT JUST PROTECTION, IT IS A FORM OF 
        <span className="italic font-serif ml-3">rebellion.</span>"
      </h2>
      <div className="w-px h-24 bg-gradient-to-b from-[#FF3B30] to-transparent mt-12"></div>
    </section>
  );
}