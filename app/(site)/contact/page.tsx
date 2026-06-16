import Reveal from "@/components/Reveal";
import BookingCalendar from "@/components/BookingCalendar";

export default function Page() {
  return (
    <>
      <section className="pt-40 pb-16">
        <div className="container-x">
          <Reveal><span className="eyebrow">Contact</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display text-6xl md:text-8xl mt-4">Even <span className="italic">hallo</span>.</h1>
          </Reveal>
        </div>
      </section>

      <section className="pb-32">
        <div className="container-x grid md:grid-cols-12 gap-12 items-start">

          {/* Left — contact info */}
          <div className="md:col-span-4 space-y-10">
            <Reveal>
              <div className="space-y-8">
                <div>
                  <div className="eyebrow mb-3">Bezoekadres</div>
                  <p className="text-lg text-espresso/80 leading-relaxed">
                    Visseringlaan 19 — 1ste verdieping<br />
                    2288 ER Rijswijk
                  </p>
                </div>

                <div>
                  <div className="eyebrow mb-3">E-mail</div>
                  <a
                    href="mailto:info@massage-lounge.nl"
                    className="text-base text-espresso underline underline-offset-4 hover:text-sand transition-colors"
                  >
                    info@massage-lounge.nl
                  </a>
                </div>

                <div>
                  <div className="eyebrow mb-3">Openingstijden</div>
                  <div className="space-y-1 text-espresso/80 text-sm leading-relaxed">
                    <div className="flex justify-between max-w-[180px]">
                      <span>Dinsdag — Vrijdag</span>
                    </div>
                    <div className="flex justify-between max-w-[180px]">
                      <span>Zaterdag</span>
                    </div>
                    <div className="text-espresso/50 mt-1">10:00 — 19:00</div>
                    <div className="text-espresso/40 text-xs mt-3">Maandag & Zondag gesloten</div>
                  </div>
                </div>

                <div className="border-t border-espresso/10 pt-8">
                  <div className="eyebrow mb-3">Volg de Lounge</div>
                  <a href="#" className="text-sm text-espresso/60 hover:text-espresso transition-colors underline underline-offset-4">
                    @massage.lounge.rijswijk
                  </a>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right — booking calendar */}
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.15}>
              <BookingCalendar />
            </Reveal>
          </div>

        </div>
      </section>
    </>
  );
}
