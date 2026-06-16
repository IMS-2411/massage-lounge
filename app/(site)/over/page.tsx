import Reveal from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <section className="pt-40 pb-20">
        <div className="container-x grid md:grid-cols-12 gap-10">
          <div className="md:col-span-7">
            <Reveal><span className="eyebrow">Over</span></Reveal>
            <Reveal delay={0.1}>
              <h1 className="h-display text-6xl md:text-8xl mt-4">Een stille <span className="italic">kamer</span> in Rijswijk.</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-x grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-6">
            <Reveal>
              <img src="/images/over-kamer_20260406_182432_gen_pro.png" className="w-full aspect-[4/5] object-cover rounded-sm" alt="" />
            </Reveal>
          </div>
          <div className="md:col-span-5 md:col-start-8 space-y-6 text-lg text-espresso/75 leading-relaxed">
            <Reveal delay={0.1}>
              <p>Massage Lounge ontstond uit een simpele behoefte. Niet te scrollen, niet te plannen, niet te presteren. Gewoon liggen, ademen, voelen.</p>
              <p className="mt-6">Daarom is de Lounge bewust klein. Eén behandelkamer, één tafel, één gast tegelijk. Warme verlichting, schone doeken, en een agenda die niet propvol staat.</p>
              <p className="mt-6">We werken met kwalitatieve oliën, zachte muziek (of stilte, als je dat liever hebt), en handen die de tijd nemen.</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-32 bg-bone">
        <div className="container-x">
          <Reveal>
            <p className="font-serif text-3xl md:text-5xl leading-[1.2] max-w-4xl">
              <span className="italic text-sand">"</span>Niet sneller, niet meer, niet beter. <br />Gewoon — even niets.<span className="italic text-sand">"</span>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
