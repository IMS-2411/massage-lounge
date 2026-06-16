import BookingForm from "@/components/BookingForm";
import Reveal from "@/components/Reveal";

export default function Page() {
  return (
    <>
      <section className="pt-40 pb-16">
        <div className="container-x">
          <Reveal><span className="eyebrow">Boeken</span></Reveal>
          <Reveal delay={0.1}>
            <h1 className="h-display text-6xl md:text-8xl mt-4 max-w-4xl">Reserveer je <span className="italic">moment</span>.</h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-xl text-lg text-espresso/70">Kies je behandeling, kies een datum en tijd. Je krijgt direct een bevestiging.</p>
          </Reveal>
        </div>
      </section>
      <section className="pb-32">
        <div className="container-x">
          <BookingForm />
        </div>
      </section>
    </>
  );
}
