"use client";
import { useEffect, useState } from "react";

const treatments = [
  { id: "gezicht", label: "Gezichtsmassage" },
  { id: "lichaam", label: "Lichaamsmassage" }
];
const durations = [
  { id: "60", label: "60 minuten · €60" },
  { id: "90", label: "90 minuten · €90" }
];

function nextDays(n: number) {
  const out: { iso: string; label: string; weekday: string }[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    const iso = day.toISOString().slice(0, 10);
    out.push({
      iso,
      label: day.toLocaleDateString("nl-NL", { day: "numeric", month: "short" }),
      weekday: day.toLocaleDateString("nl-NL", { weekday: "short" })
    });
  }
  return out;
}

export default function BookingForm() {
  const days = nextDays(21);
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState(treatments[0].id);
  const [duration, setDuration] = useState(durations[0].id);
  const [date, setDate] = useState(days[0].iso);
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [form, setForm] = useState({ name: "", email: "", phone: "", notes: "" });
  const [done, setDone] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    fetch(`/api/slots?date=${date}`).then(r => r.json()).then(d => setSlots(d.slots));
    setTime("");
  }, [date]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        ...form,
        treatment: treatments.find(t => t.id === treatment)?.label,
        duration: durations.find(d => d.id === duration)?.label,
        date,
        time
      })
    });
    if (!res.ok) {
      const j = await res.json();
      setErr(j.error || "Er ging iets mis.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="max-w-2xl border border-espresso/15 p-12 md:p-16 rounded-sm bg-bone">
        <span className="eyebrow">Bevestigd</span>
        <h2 className="h-display text-5xl md:text-6xl mt-4">Tot snel.</h2>
        <p className="mt-6 text-espresso/75 leading-relaxed">
          Je afspraak op <strong>{date}</strong> om <strong>{time}</strong> staat genoteerd. Je ontvangt zo een bevestiging op {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-7 space-y-12">
        {/* Treatment */}
        <div>
          <div className="eyebrow mb-4">01 · Behandeling</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {treatments.map(t => (
              <button type="button" key={t.id} onClick={() => setTreatment(t.id)}
                className={`p-5 border rounded-sm text-left transition-all ${treatment === t.id ? "border-espresso bg-espresso text-cream" : "border-espresso/20 hover:border-espresso/50"}`}>
                <div className="font-serif text-2xl">{t.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <div className="eyebrow mb-4">02 · Duur</div>
          <div className="grid sm:grid-cols-2 gap-3">
            {durations.map(d => (
              <button type="button" key={d.id} onClick={() => setDuration(d.id)}
                className={`p-5 border rounded-sm text-left transition-all ${duration === d.id ? "border-espresso bg-espresso text-cream" : "border-espresso/20 hover:border-espresso/50"}`}>
                <div className="font-serif text-2xl">{d.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <div className="eyebrow mb-4">03 · Datum</div>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
            {days.map(d => (
              <button type="button" key={d.iso} onClick={() => setDate(d.iso)}
                className={`shrink-0 w-20 py-4 border rounded-sm text-center transition-all ${date === d.iso ? "border-espresso bg-espresso text-cream" : "border-espresso/20 hover:border-espresso/50"}`}>
                <div className="text-[10px] uppercase tracking-wider opacity-70">{d.weekday}</div>
                <div className="font-serif text-xl mt-1">{d.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time */}
        <div>
          <div className="eyebrow mb-4">04 · Tijd</div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {slots.map(s => (
              <button type="button" key={s.time} disabled={!s.available} onClick={() => setTime(s.time)}
                className={`py-3 border rounded-sm text-sm transition-all ${time === s.time ? "border-espresso bg-espresso text-cream" : s.available ? "border-espresso/20 hover:border-espresso/50" : "border-espresso/10 text-espresso/30 line-through cursor-not-allowed"}`}>
                {s.time}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: details */}
      <div className="lg:col-span-5">
        <div className="border border-espresso/15 p-8 md:p-10 rounded-sm bg-bone sticky top-28 space-y-5">
          <div className="eyebrow">05 · Jouw gegevens</div>
          <input required placeholder="Naam" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/30 py-3 focus:outline-none focus:border-espresso placeholder:text-espresso/40" />
          <input required type="email" placeholder="E-mail" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/30 py-3 focus:outline-none focus:border-espresso placeholder:text-espresso/40" />
          <input required placeholder="Telefoon" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/30 py-3 focus:outline-none focus:border-espresso placeholder:text-espresso/40" />
          <textarea placeholder="Opmerkingen (optioneel)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })}
            className="w-full bg-transparent border-b border-espresso/30 py-3 focus:outline-none focus:border-espresso placeholder:text-espresso/40 resize-none" rows={3} />

          <div className="pt-4 text-sm text-espresso/70 space-y-1">
            <div>Behandeling: <strong>{treatments.find(t => t.id === treatment)?.label}</strong></div>
            <div>Duur: <strong>{durations.find(d => d.id === duration)?.label}</strong></div>
            <div>Datum: <strong>{date || "—"}</strong></div>
            <div>Tijd: <strong>{time || "—"}</strong></div>
          </div>

          {err && <div className="text-sm text-red-700">{err}</div>}

          <button disabled={!time} type="submit"
            className="w-full mt-2 bg-espresso text-cream py-4 rounded-full text-sm hover:bg-sand transition-all disabled:opacity-40 disabled:cursor-not-allowed">
            Bevestig boeking →
          </button>
        </div>
      </div>
    </form>
  );
}
