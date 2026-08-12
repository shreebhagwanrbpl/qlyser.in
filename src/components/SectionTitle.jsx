export default function SectionTitle({
  badge,
  title,
  description,
  center = false,
  dark = false,
}) {
  return (
    <div
      className={`${
        center ? "mx-auto text-center" : ""
      } relative max-w-4xl`}
    >
      {/* Badge */}
      {badge && (
        <div
          className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold shadow-sm ${
            dark
              ? "border border-slate-700 bg-slate-800/90 text-amber-300"
              : "border border-slate-300 bg-slate-100/80 text-slate-800"
          }`}
        >
          <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse" />
          {badge}
        </div>
      )}

      {/* Title */}
      <h2
        className={`mt-5 text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.18] tracking-tight ${
          dark ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>

      {/* Divider */}
      <div
        className={`mt-5 h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-600 via-teal-500 to-cyan-500 ${
          center ? "mx-auto" : ""
        }`}
      />

      {/* Description */}
      {description && (
        <p
          className={`mt-5 max-w-2xl text-base sm:text-lg leading-relaxed font-normal ${
            dark ? "text-slate-200" : "text-slate-700"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}