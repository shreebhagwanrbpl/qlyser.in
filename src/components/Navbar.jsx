"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, X, ArrowRight } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import rajbiosisLogo from "@/components/img/rajbiosis-logo.png";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const pathParts = pathname.split("/").filter(Boolean);
  const staticRoutes = ["about", "services", "products", "contact", "items"];

  const district =
    pathParts.length > 0 && !staticRoutes.includes(pathParts[0])
      ? pathParts[0]
      : "";

  const makeLink = (path) => {
    if (!district) return path;
    if (path === "/") return `/${district}`;
    return `/${district}${path}`;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Products", path: "/products" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-2xl shadow-sm">
      <div className="container-custom flex h-20 items-center justify-between">
        {/* Official Brand Logo */}
        <Link href={makeLink("/")} className="flex items-center gap-3 transition hover:opacity-90">
          <div className="relative h-14 w-auto flex-shrink-0 py-1">
            <Image
              src={rajbiosisLogo}
              alt="Raj Biosis Private Limited Logo"
              height={56}
              width={180}
              className="h-12 w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-9">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={makeLink(link.path)}
              className="relative font-bold text-slate-800 transition-colors duration-200 hover:text-blue-600 after:absolute after:-bottom-1.5 after:left-0 after:h-[2.5px] after:w-0 after:bg-blue-600 after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Quote Button */}
        <div className="hidden lg:block">
          <Link href={makeLink("/contact")}>
            <button className="group flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:scale-105">
              <span>Get Quote</span>
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-900 transition hover:bg-slate-100 lg:hidden"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-[500px]" : "max-h-0"
        }`}
      >
        <div className="border-t border-slate-200 bg-white p-6 shadow-xl">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={makeLink(link.path)}
                onClick={() => setMenuOpen(false)}
                className="rounded-xl px-4 py-3 font-bold text-slate-800 transition hover:bg-slate-100 hover:text-blue-600"
              >
                {link.name}
              </Link>
            ))}

            <Link href={makeLink("/contact")} onClick={() => setMenuOpen(false)}>
              <button className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-blue-700">
                <span>Get Quote</span>
                <ArrowRight size={17} />
              </button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}