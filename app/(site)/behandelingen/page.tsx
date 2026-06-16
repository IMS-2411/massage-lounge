import Link from "next/link";
import Reveal from "@/components/Reveal";

const treatments = [
  {
    tag: "01",
    title: "Gezichtsmassage",
    duration: "60 of 90 min",
    img: "/images/gezichtsmassage_20260406_182352_gen_pro.png",
    copy: "Een rituele behandeling van het gezicht, de hals en het sleutelbeen. Met warme olie en zachte druk lossen we vastgehouden spanning op rond de kaak, slapen en voorhoofd. Ik werk met twee speciale technieken die de huid van binnenuit verzorgen.",
    techniques: [
      {
        name: "Lifting massage",
        description: "Een sculpterende massage waarbij de spieren en bindweefsels van het gezicht gericht worden geactiveerd. Door de wangen, kaaklijn en voorhoofd met stevige maar zachte streken te bewerken, wordt de huid opgetild en de contouren zichtbaar verstevig­d. Het resultaat voelt direct: een gladder, stralender gezicht zonder injecties of apparaten."
      },
      {
        name: "Buccal massage",
        description: "Een diepe weefselmassage waarbij ik ook van binnenuit — via de binnenkant van de mond — de kaakspieren, wangen en mondhoeken behandel. De buccal techniek bereikt spierspanning die van buitenaf onmogelijk los te maken is. Ideaal bij knarsetanden, een gespannen kaak of verlies van volume in de wangen. De behandeling voelt intens maar ontspant diep."
      }
    ],
    includes: ["Reiniging met warme doeken", "Lifting massage — sculpterende gezichtscontouren", "Buccal massage — diepe kaak- en wangontspanning", "Lymfedrainage rond de ogen", "Afsluitende stilte"]
  },
  {
    tag: "02",
    title: "Lichaamsmassage",
    duration: "60 of 90 min",
    img: "/images/lichaamsmassage_20260406_182412_gen_pro.png",
    copy: "Een grondige massage van rug, schouders, armen en benen. Diep waar het mag, zacht waar het moet. Geen vast script — we beginnen waar jouw lichaam vraagt om aandacht.",
    includes: ["Volledige rug en schouders", "Armen, handen, benen, voeten", "Aanpasbare druk", "Warm verzorgde tafel"]
  }
];

export default function Page() {
  return (
    <>
      <section className="pt-40 pb-20">
        <div className="container-x">
          <Reveal><span className="eyebrow">Behandelingen</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display text-6xl md:text-8xl mt-4 max-w-4xl">Twee behandelingen, <span className="italic">één bedoeling</span>.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg text-espresso/70">Bij Massage Lounge houden we het bewust klein. Geen menukaart vol opties — twee behandelingen die we écht goed doen.</p>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-x space-y-32">
          {treatments.map((t, i) => (
            <Reveal key={t.title}>
              <div className={`grid md:grid-cols-12 gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
                <div className="md:col-span-6">
                  <div className="aspect-[4/5] overflow-hidden rounded-sm">
                    <img src={t.img} alt={t.title} className="w-full h-full object-cover" />
                  </div>
                </div>
                <div className="md:col-span-5 md:col-start-8">
                  <span className="eyebrow">{t.tag} · {t.duration}</span>
                  <h2 className="h-display text-5xl md:text-6xl mt-4">{t.title}</h2>
                  <p className="mt-6 text-espresso/75 leading-relaxed">{t.copy}</p>
                  {"techniques" in t && t.techniques && (
                    <div className="mt-8 space-y-6">
                      {t.techniques.map((tech: { name: string; description: string }) => (
                        <div key={tech.name} className="border-l-2 border-sand pl-5">
                          <h3 className="font-serif text-base font-medium text-espresso">{tech.name}</h3>
                          <p className="mt-2 text-sm text-espresso/70 leading-relaxed">{tech.description}</p>
                        </div>
                      ))}
                    </div>
                  )}
                  <ul className="mt-8 space-y-2 text-sm text-espresso/70">
                    {t.includes.map(x => <li key={x} className="flex gap-3"><span className="text-sand">—</span>{x}</li>)}
                  </ul>
                  <Link href="/boeken" className="mt-10 inline-flex items-center gap-3 bg-espresso text-cream px-7 py-4 rounded-full text-sm hover:bg-sand transition-all">
                    Boek deze behandeling →
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
