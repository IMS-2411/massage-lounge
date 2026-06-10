import Reveal from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <section className="pt-40 pb-20">
        <div className="container-x">
          <Reveal><span className="eyebrow">Contact</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display text-6xl md:text-8xl mt-4">Even <span className="italic">hallo</span>.</h1>
          </Reveal>
        </div>
      </section>
      <section className="pb-32">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <Reveal>
            <div className="md:col-span-5 space-y-8">
              <div>
                <div className="eyebrow mb-3">Bezoekadres</div>
                <p className="text-lg text-espresso/80">Rijswijk<br />(adres op afspraak)</p>
              </div>
              <div>
                <div className="eyebrow mb-3">E-mail</div>
                <a className="text-lg underline underline-offset-4" href="mailto:hallo@massagelounge.nl">hallo@massagelounge.nl</a>
              </div>
              <div>
                <div className="eyebrow mb-3">Openingstijden</div>
                <p className="text-lg text-espresso/80">Di — Za<br />10:00 — 19:00</p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="md:col-span-7">
              <img src="/images/lichaamsmassage_20260406_182412_gen_pro.png" className="w-full aspect-[4/3] object-cover rounded-sm" alt="" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
