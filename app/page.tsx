import Link from "next/link";
import Reveal from "@/components/Reveal";
import HeroVideo from "@/components/HeroVideo";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[100svh] flex items-end overflow-hidden">
        {/* Static poster — stays visible before and after the video */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "url('/images/hero-facial_20260406_182050_gen_pro.png')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        {/* Hero video — plays once on load, fades out on end revealing poster */}
        <HeroVideo />
        {/* subtle scrim only behind text for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/15 to-black/20" />

        <div className="container-x relative pb-24 pt-40 md:pb-32 md:pt-48 text-cream">
          <div className="max-w-2xl">
            <Reveal>
              <span className="eyebrow !text-cream/80">Massage Lounge</span>
            </Reveal>
            <Reveal delay={0.1}>
              <h1 className="h-display mt-6 text-[14vw] md:text-[7.5rem] lg:text-[9rem] drop-shadow-[0_2px_30px_rgba(0,0,0,0.35)]">
                Adem<span className="italic">.</span><br />
                <span className="italic text-sand">Voel.</span> Wees.
              </h1>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-8 max-w-md text-lg text-cream/90 leading-relaxed">
                Een stille kamer waar tijd langzamer gaat. Gezichts- en lichaamsmassages, met aandacht en zonder haast.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <Link
                  href="/boeken"
                  className="group inline-flex items-center gap-3 bg-cream text-espresso px-7 py-4 rounded-full text-sm hover:bg-sand hover:text-cream transition-all"
                >
                  Boek een moment
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
                <Link href="/behandelingen" className="text-sm text-cream underline underline-offset-4 hover:text-sand">
                  Bekijk behandelingen
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.3em] text-cream/60">
          scroll
        </div>
      </section>

      {/* INTRO MARQUEE */}
      <section className="py-24 md:py-40">
        <div className="container-x">
          <Reveal>
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl leading-[1.15] max-w-5xl">
              Geen pakketten, geen gehaaste handen. <span className="text-espresso/40">Alleen een kamer, een tafel, en de tijd om écht los te laten.</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* TREATMENTS */}
      <section className="pb-24 md:pb-40">
        <div className="container-x">
          <Reveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <span className="eyebrow">Behandelingen</span>
                <h2 className="h-display text-5xl md:text-7xl mt-3">Twee manieren <br /><span className="italic">om te landen.</span></h2>
              </div>
              <Link href="/behandelingen" className="hidden md:inline text-sm underline underline-offset-4">Alles bekijken</Link>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                tag: "01 — Gezicht",
                title: "Gezichtsmassage",
                copy: "Diepe ontspanning vanaf de slapen tot aan het sleutelbeen. Voor wie te veel denkt en te weinig voelt.",
                img: "/images/gezichtsmassage_20260406_182352_gen_pro.png"
              },
              {
                tag: "02 — Lichaam",
                title: "Lichaamsmassage",
                copy: "Een vol uur waarin je niets hoeft. Spanning lost op, ademhaling wordt langer, schouders zakken terug.",
                img: "/images/lichaamsmassage_20260406_182412_gen_pro.png"
              }
            ].map((t, i) => (
              <Reveal key={t.title} delay={i * 0.1}>
                <Link href="/behandelingen" className="group block relative aspect-[4/5] overflow-hidden rounded-sm">
                  <div
                    className="absolute inset-0 transition-transform duration-[1.6s] ease-out group-hover:scale-105"
                    style={{ backgroundImage: `url(${t.img})`, backgroundSize: "cover", backgroundPosition: "center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/20 to-transparent" />
                  <div className="relative h-full p-8 md:p-10 flex flex-col justify-end text-cream">
                    <div>
                      <h3 className="font-serif text-4xl md:text-5xl">{t.title}</h3>
                      <p className="mt-4 max-w-sm text-cream/80">{t.copy}</p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm border-b border-cream/40 pb-1">
                        Meer lezen <span>→</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="py-24 md:py-40 bg-bone">
        <div className="container-x grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5">
            <Reveal>
              <span className="eyebrow">De plek</span>
              <h2 className="h-display text-5xl md:text-6xl mt-3">Klein. <br /><span className="italic">Stil.</span> Van jou.</h2>
            </Reveal>
          </div>
          <div className="md:col-span-6 md:col-start-7 space-y-6 text-lg text-espresso/75 leading-relaxed">
            <Reveal delay={0.1}>
              <p>Geen wachtkamer vol mensen. Je komt binnen, je legt alles even weg, en je krijgt precies de tijd die je nodig hebt.</p>
              <Link href="/over" className="inline-block text-sm underline underline-offset-4">Over de Lounge</Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PRICING TEASER */}
      <section className="py-24 md:py-40">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow">Tarieven</span>
            <h2 className="h-display text-5xl md:text-7xl mt-3">Eerlijk en helder.</h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 gap-px bg-espresso/15">
            {[
              { time: "60 minuten", price: "€60", note: "Gezichts- of lichaamsmassage" },
              { time: "90 minuten", price: "€90", note: "Verdiepte sessie naar keuze" }
            ].map((p, i) => (
              <Reveal key={p.time} delay={i * 0.1}>
                <div className="bg-cream p-10 md:p-14 flex flex-col gap-6">
                  <span className="eyebrow">{p.time}</span>
                  <div className="font-serif text-7xl md:text-8xl">{p.price}</div>
                  <p className="text-espresso/70">{p.note}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/boeken" className="inline-flex items-center gap-3 bg-espresso text-cream px-7 py-4 rounded-full text-sm hover:bg-sand transition-all">
              Plan je sessie →
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 md:py-40 bg-espresso text-cream">
        <div className="container-x">
          <Reveal>
            <span className="eyebrow !text-cream/60">Wat gasten zeggen</span>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="font-serif text-3xl md:text-5xl lg:text-6xl mt-6 leading-[1.2] max-w-5xl">
              <span className="italic text-sand">"</span>Ik liep binnen met een hoofd vol ruis en ging naar buiten alsof iemand het volume zachter had gezet.<span className="italic text-sand">"</span>
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 text-cream/60 text-sm">— Sanne, terugkerende gast</p>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 md:py-48">
        <div className="container-x text-center">
          <Reveal>
            <h2 className="h-display text-6xl md:text-8xl">Tot zo, in <span className="italic text-sand">de Lounge</span>.</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/boeken" className="mt-12 inline-flex items-center gap-3 bg-espresso text-cream px-8 py-5 rounded-full text-sm hover:bg-sand transition-all">
              Boek een moment →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
