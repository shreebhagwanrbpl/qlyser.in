export default function SeoContent({ city = "" }) {
    const location = city || "India";

    return (
        <section className="relative overflow-hidden bg-white py-24">

            {/* Background */}

            <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#CBD5E1]/10 blur-[150px]" />

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

                <div className="max-w-4xl">

                    <div className="inline-flex items-center gap-2 rounded-full border border-[#94A3B8]/30 bg-[#F8FAFC] px-5 py-2 text-sm font-semibold text-[#64748B]">

                        Biomedical Solutions

                    </div>

                    <h2 className="mt-6 text-4xl lg:text-5xl font-black text-[#1E293B]">

                        Biomedical Equipment Supplier in {location}

                    </h2>

                    <div className="mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-[#64748B] via-[#CBD5E1] to-[#64748B]" />

                </div>

                {/* Content */}

                <div className="mt-12 rounded-[32px] border border-[#CBD5E1]/15 bg-white p-10 shadow-[0_25px_70px_rgba(15,23,42,.08)]">

                    <div className="space-y-7 text-lg leading-9 text-slate-600">

                        <p>
                            Raj Biosis Private Limited is a reliable supply partner for pathology laboratory machines and clinical testing tools in <strong>{location}</strong>.
                            We help medical facilities acquire CBC blood cell counters, biochemistry testing analyzers, urine strip meters, ELISA microplate instruments, and essential diagnostic devices.
                        </p>

                        <p>
                            Our main goal is to make healthcare diagnostics simpler and more reliable for local pathology labs, clinics, and hospital testing units across India. We believe accurate testing equipment forms the backbone of great patient care.
                        </p>

                        <p>
                            Beyond supplying machinery, our trained technical team assists with machine calibration, staff operation training, and routine preventative servicing. Whether setting up a brand-new laboratory or replacing an older analyzer, we guide you to the right model for your workload.
                        </p>

                        <p>
                            With direct supply coverage across major towns and districts, Raj Biosis Private Limited ensures fast delivery of machinery, daily chemicals, and emergency repair services right to your doorstep.
                        </p>

                    </div>

                </div>

                {/* FAQ */}

                <div className="mt-20">

                    <div className="inline-flex items-center gap-2 rounded-full border border-[#94A3B8]/30 bg-[#F8FAFC] px-5 py-2 text-sm font-semibold text-[#64748B]">

                        Helpful Information

                    </div>

                    <h2 className="mt-6 text-4xl font-black text-[#1E293B]">
                        Frequently Asked Questions
                    </h2>

                    <div className="mt-10 grid gap-6">

                        {[
                            {
                                q: "How quickly can you deliver laboratory equipment to our facility?",
                                a: "We ship standard analyzers and diagnostic supplies promptly, with delivery timelines depending on your specific district location."
                            },
                            {
                                q: "What types of diagnostic instruments do you offer?",
                                a: "We supply fully automated biochemistry machines, hematology cell counters, electrolyte meters, urine test analyzers, and high-purity diagnostic reagents."
                            },
                            {
                                q: "Does an engineer come to set up the machine?",
                                a: "Yes, our biomedical engineer visits your laboratory to install the machine, calibrate all parameters, and train your staff on daily operations."
                            },
                            {
                                q: "Can small clinics or private diagnostic labs order from Raj Biosis?",
                                a: "Absolutely. We work with independent pathology labs, doctor clinics, multi-specialty hospitals, and diagnostic testing networks of all sizes."
                            }
                        ].map((item, index) => (

                            <div
                                key={index}
                                className="rounded-3xl border border-[#CBD5E1]/15 bg-white p-8 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                            >

                                <h3 className="text-xl font-bold text-[#1E293B]">

                                    {item.q}

                                </h3>

                                <p className="mt-3 leading-8 text-slate-600">

                                    {item.a}

                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </section>
    );
}