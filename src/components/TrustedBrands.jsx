export default function TrustedBrands() {
  const brands = [
    "HealthCare+",
    "BioMed Labs",
    "MediCore",
    "Life Diagnostics",
    "Care Plus",
  ];

  return (
    <section className="relative overflow-hidden bg-white py-20">

      {/* Background Glow */}

      <div className="absolute -top-32 left-1/2 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-[#CBD5E1]/10 blur-[140px]" />

      {/* Grid */}

      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#94A3B8 1px, transparent 1px), linear-gradient(90deg,#94A3B8 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="container-custom relative z-10">

        {/* Heading */}

        <div className="text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-[#94A3B8]/30 bg-[#F8FAFC] px-5 py-2 text-sm font-semibold text-[#64748B]">

            Trusted Partners

          </span>

          <h2 className="mt-6 text-4xl font-black text-[#1E293B]">

            Trusted by Healthcare &
            Biomedical Organizations

          </h2>

          <div className="mx-auto mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#64748B] via-[#CBD5E1] to-[#64748B]" />

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-600">

            Partnering with hospitals, laboratories,
            diagnostic centres and healthcare
            institutions across India.

          </p>

        </div>

        {/* Brands */}

        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">

          {brands.map((brand, index) => (

            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-[#CBD5E1]/15 bg-white p-8 text-center shadow-[0_15px_40px_rgba(15,23,42,.08)] transition-all duration-500 hover:-translate-y-2 hover:border-[#94A3B8]/40 hover:shadow-[0_25px_60px_rgba(15,23,42,.15)]"
            >

              {/* Top Line */}

              <div className="absolute left-0 top-0 h-1 w-0 bg-gradient-to-r from-[#64748B] via-[#CBD5E1] to-[#E2E8F0] transition-all duration-500 group-hover:w-full" />

              {/* Logo Circle */}

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#F8FAFC] text-2xl font-black text-[#64748B] transition-all duration-500 group-hover:rotate-6 group-hover:scale-110">

                {brand.charAt(0)}

              </div>

              {/* Brand */}

              <h3 className="text-lg font-bold text-[#1E293B] transition-colors duration-300 group-hover:text-[#64748B]">

                {brand}

              </h3>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}