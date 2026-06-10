"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { href: "/behandelingen", label: "Behandelingen" },
  { href: "/over", label: "Over" },
  { href: "/tarieven", label: "Tarieven" },
  { href: "/contact", label: "Contact" }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const textColor = scrolled ? "text-espresso" : "text-cream";
  const borderColor = scrolled ? "border-espresso" : "border-cream";
  const hoverBg = scrolled ? "hover:bg-espresso hover:text-cream" : "hover:bg-cream hover:text-espresso";

  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "bg-cream/90 backdrop-blur-md border-b border-espresso/10" : ""}`}>
      <div className={`container-x flex items-center justify-between h-20 ${textColor}`}>
        <Link href="/" className="font-serif text-xl tracking-tight">
          Massage Lounge
        </Link>
        <nav className="hidden md:flex items-center gap-10 text-sm">
          {links.map(l => (
            <Link key={l.href} href={l.href} className="hover:text-sand transition-colors">{l.label}</Link>
          ))}
        </nav>
        <Link href="/boeken" className={`hidden md:inline-flex items-center text-sm border ${borderColor} px-5 py-2.5 rounded-full ${hoverBg} transition-all`}>
          Boek een moment
        </Link>
        <button onClick={() => setOpen(!open)} className="md:hidden text-sm" aria-label="Menu">
          {open ? "Sluit" : "Menu"}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-cream border-t border-espresso/10">
          <div className="container-x py-6 flex flex-col gap-4 text-base">
            {links.map(l => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1">{l.label}</Link>
            ))}
            <Link href="/boeken" onClick={() => setOpen(false)} className="mt-2 inline-flex items-center text-sm border border-espresso px-5 py-3 rounded-full w-fit">Boek een moment</Link>
          </div>
        </div>
      )}
    </header>
  );
}
