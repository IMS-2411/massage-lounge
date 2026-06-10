import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-espresso/15 bg-cream">
      <div className="container-x py-20 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <div className="font-serif text-3xl">Massage <span className="italic">Lounge</span></div>
          <p className="mt-4 max-w-sm text-espresso/70">Een rustpunt in Rijswijk. Voor wie even wil ademen, voelen, en weer verder kan.</p>
        </div>
        <div>
          <div className="eyebrow mb-4">Bezoek</div>
          <p className="text-espresso/80 leading-relaxed">Rijswijk<br/>Op afspraak</p>
        </div>
        <div>
          <div className="eyebrow mb-4">Menu</div>
          <ul className="space-y-2 text-espresso/80">
            <li><Link href="/behandelingen">Behandelingen</Link></li>
            <li><Link href="/tarieven">Tarieven</Link></li>
            <li><Link href="/over">Over</Link></li>
            <li><Link href="/boeken">Boeken</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-x py-6 border-t border-espresso/10 text-xs text-espresso/50 flex justify-between">
        <span>© {new Date().getFullYear()} Massage Lounge</span>
        <span>Rijswijk · NL</span>
      </div>
    </footer>
  );
}
