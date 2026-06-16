import Link from "next/link";
import Reveal from "@/components/Reveal";

const tiers = [
  { time: "60 minuten", price: "€60", note: "Gezichts- of lichaamsmassage. Genoeg om volledig te landen.", popular: false },
  { time: "90 minuten", price: "€90", note: "Een verdiepte sessie. Meer ruimte, meer rust, meer effect.", popular: true }
];

export default function Page() {
  return (
    <>
      <section className="pt-40 pb-20">
        <div className="container-x">
          <Reveal><span className="eyebrow">Tarieven</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display text-6xl md:text-8xl mt-4 max-w-3xl">Eerlijk. <span className="italic">Helder.</span> Geen kleine lettertjes.</h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-x">
          <div className="grid md:grid-cols-2 gap-px bg-espresso/15">
            {tiers.map((t, i) => (
              <Reveal key={t.time} delay={i * 0.1}>
                <div className="bg-cream p-10 md:p-16 min-h-[480px] flex flex-col">
                  {t.popular && <span className="eyebrow !text-sand mb-6">Meest gekozen</span>}
                  <span className="eyebrow">{t.time}</span>
                  <div className="font-serif text-8xl md:text-9xl mt-6">{t.price}</div>
                  <p className="mt-6 text-espresso/75 max-w-sm">{t.note}</p>
                  <div className="mt-auto pt-10">
                    <Link href="/boeken" className="inline-flex items-center gap-3 border border-espresso px-6 py-3.5 rounded-full text-sm hover:bg-espresso hover:text-cream transition-all">
                      Boek {t.time} →
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="mt-16 max-w-2xl text-espresso/65 text-sm leading-relaxed space-y-2">
              <p>Betaling ter plekke (contant of pin). Annuleren kan kosteloos tot 24 uur voor je afspraak.</p>
              <p>Cadeaubon nodig? Stuur even een berichtje via de contactpagina.</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
