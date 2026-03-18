export default function StatementSection() {
  return (
    <section className="bg-slate-900 text-white py-32 px-6 flex flex-col items-center justify-center text-center">
      <p className="text-sm font-mono text-amber-400 mb-6 uppercase tracking-widest">
        Est. 2025 — Crafted with care
      </p>
      <h2 className="max-w-4xl text-3xl md:text-6xl font-medium leading-tight tracking-tight">
        "WE DESIGN FOR THE <span className="text-slate-400">MOMENTS</span> THAT MATTER.
        CLOTHING IS NOT JUST FABRIC, IT IS HOW WE TELL OUR
        <span className="italic font-serif ml-3">story.</span>"
      </h2>
      <div className="w-px h-24 bg-gradient-to-b from-amber-500 to-transparent mt-12"></div>
    </section>
  );
}
