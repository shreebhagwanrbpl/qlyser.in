export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
}) {
  return (
    <div
      className={`${center ? "mx-auto text-center" : ""
        } relative max-w-4xl`}
    >

      {/* Badge */}

      {badge && (
        <div className="inline-flex items-center gap-2 rounded-full border border-[#94A3B8]/25 bg-[#F8FAFC] px-5 py-2 text-sm font-semibold text-[#64748B] shadow-md shadow-yellow-200/30">

          <span className="h-2 w-2 rounded-full bg-[#94A3B8]" />

          {badge}

        </div>
      )}

      {/* Title */}

      <h2 className="mt-6 text-4xl font-black leading-tight text-[#1E293B] md:text-5xl lg:text-6xl">

        {title}

      </h2>

      {/* Divider */}

      <div
        className={`mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#64748B] via-[#CBD5E1] to-[#64748B] ${center ? "mx-auto" : ""
          }`}
      />

      {/* Description */}

      <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">

        {description}

      </p>

    </div>
  );
}