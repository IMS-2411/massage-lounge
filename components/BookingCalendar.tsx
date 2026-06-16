"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

const TIME_SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

const MONTHS_NL = ["Januari","Februari","Maart","April","Mei","Juni","Juli","Augustus","September","Oktober","November","December"];
const DAYS_NL = ["Ma","Di","Wo","Do","Vr","Za","Zo"];

function toISO(d: Date) { return d.toISOString().slice(0, 10); }

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstWeekday(year: number, month: number) {
  // 0=Ma … 6=Zo
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

export default function BookingCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [slots, setSlots] = useState<{ time: string; available: boolean }[]>([]);
  const [step, setStep] = useState<"calendar" | "time" | "form" | "done">("calendar");
  const [form, setForm] = useState({ name: "", email: "", phone: "", treatment: "Gezichtsmassage", duration: "60 min", notes: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const daysInMonth = getDaysInMonth(year, month);
  const firstWeekday = getFirstWeekday(year, month);

  async function loadSlots(date: string) {
    const r = await fetch(`/api/slots?date=${date}`).then(r => r.json());
    setSlots(r.slots || []);
  }

  function selectDate(day: number) {
    const d = new Date(year, month, day);
    if (d < new Date(today.getFullYear(), today.getMonth(), today.getDate())) return;
    const iso = toISO(d);
    setSelectedDate(iso);
    setSelectedTime(null);
    loadSlots(iso);
    setStep("time");
  }

  function prevMonth() {
    if (month === 0) { setYear(y => y - 1); setMonth(11); }
    else setMonth(m => m - 1);
  }
  function nextMonth() {
    if (month === 11) { setYear(y => y + 1); setMonth(0); }
    else setMonth(m => m + 1);
  }

  async function submit() {
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/bookings", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...form, date: selectedDate, time: selectedTime })
      });
      const data = await r.json();
      if (!r.ok) { setError(data.error || "Er ging iets mis."); setLoading(false); return; }
      setStep("done");
    } catch { setError("Er ging iets mis. Probeer het opnieuw."); }
    setLoading(false);
  }

  const dateLabel = selectedDate
    ? new Date(selectedDate + "T12:00:00").toLocaleDateString("nl-NL", { weekday: "long", day: "numeric", month: "long" })
    : "";

  return (
    <div className="bg-bone rounded-sm overflow-hidden">
      {/* Header */}
      <div className="bg-espresso text-cream px-8 py-6">
        <div className="eyebrow !text-cream/60 mb-1">Beschikbaarheid</div>
        <h3 className="font-serif text-2xl">Kies een moment</h3>
      </div>

      <div className="p-8">
        {/* Step indicators */}
        <div className="flex items-center gap-2 mb-8">
          {["Datum", "Tijd", "Gegevens"].map((s, i) => {
            const stepIdx = step === "calendar" ? 0 : step === "time" ? 1 : step === "form" ? 2 : 3;
            const active = i === stepIdx;
            const done = i < stepIdx;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-6 h-6 rounded-full text-xs flex items-center justify-center font-medium transition-all
                  ${done ? "bg-sand text-cream" : active ? "bg-espresso text-cream" : "border border-espresso/20 text-espresso/40"}`}>
                  {done ? "✓" : i + 1}
                </div>
                <span className={`text-xs ${active ? "text-espresso font-medium" : "text-espresso/40"}`}>{s}</span>
                {i < 2 && <div className="w-8 h-px bg-espresso/15 mx-1" />}
              </div>
            );
          })}
        </div>

        {/* CALENDAR */}
        {step === "calendar" && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <button onClick={prevMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-espresso/10 transition-all text-espresso/60 hover:text-espresso">‹</button>
              <span className="font-serif text-lg">{MONTHS_NL[month]} {year}</span>
              <button onClick={nextMonth} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-espresso/10 transition-all text-espresso/60 hover:text-espresso">›</button>
            </div>
            <div className="grid grid-cols-7 mb-2">
              {DAYS_NL.map(d => <div key={d} className="text-center text-[10px] uppercase tracking-wider text-espresso/40 py-1">{d}</div>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: firstWeekday }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const d = new Date(year, month, day);
                const iso = toISO(d);
                const isPast = d < new Date(today.getFullYear(), today.getMonth(), today.getDate());
                const isToday = iso === toISO(today);
                const isSun = d.getDay() === 0;
                return (
                  <button key={day} disabled={isPast || isSun}
                    onClick={() => selectDate(day)}
                    className={`aspect-square flex items-center justify-center rounded-sm text-sm transition-all
                      ${isPast || isSun ? "text-espresso/20 cursor-default" : "hover:bg-espresso hover:text-cream cursor-pointer"}
                      ${isToday ? "border border-sand text-sand" : ""}
                      ${selectedDate === iso ? "bg-espresso text-cream" : ""}`}>
                    {day}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-espresso/40">Zondag gesloten.</p>
          </div>
        )}

        {/* TIME SLOTS */}
        {step === "time" && (
          <div>
            <button onClick={() => setStep("calendar")} className="text-xs text-espresso/50 hover:text-espresso mb-6 flex items-center gap-1">‹ Andere datum</button>
            <div className="font-serif text-lg mb-1 capitalize">{dateLabel}</div>
            <p className="text-xs text-espresso/50 mb-6">Kies een tijdstip</p>
            <div className="grid grid-cols-2 gap-3">
              {slots.length === 0 && <p className="col-span-2 text-sm text-espresso/50">Laden…</p>}
              {slots.map(s => (
                <button key={s.time} disabled={!s.available}
                  onClick={() => { setSelectedTime(s.time); setStep("form"); }}
                  className={`py-4 border rounded-sm text-sm font-medium transition-all
                    ${!s.available ? "border-espresso/10 text-espresso/25 line-through cursor-default" :
                      selectedTime === s.time ? "border-espresso bg-espresso text-cream" :
                      "border-espresso/30 hover:border-espresso hover:bg-espresso/5"}`}>
                  {s.time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* FORM */}
        {step === "form" && (
          <div>
            <button onClick={() => setStep("time")} className="text-xs text-espresso/50 hover:text-espresso mb-6 flex items-center gap-1">‹ Ander tijdstip</button>
            <div className="bg-espresso/5 border border-espresso/10 rounded-sm px-5 py-4 mb-6">
              <div className="text-xs text-espresso/50 uppercase tracking-wider mb-1">Jouw keuze</div>
              <div className="font-serif text-base capitalize">{dateLabel} · {selectedTime}</div>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-espresso/50 block mb-1.5">Naam *</label>
                  <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full border border-espresso/20 bg-cream rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="Jouw naam" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-espresso/50 block mb-1.5">Telefoon *</label>
                  <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                    className="w-full border border-espresso/20 bg-cream rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="06 —" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-espresso/50 block mb-1.5">E-mail *</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full border border-espresso/20 bg-cream rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors" placeholder="jouw@email.nl" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wider text-espresso/50 block mb-1.5">Behandeling *</label>
                  <select value={form.treatment} onChange={e => setForm(f => ({ ...f, treatment: e.target.value }))}
                    className="w-full border border-espresso/20 bg-cream rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors">
                    <option>Gezichtsmassage</option>
                    <option>Lichaamsmassage</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-espresso/50 block mb-1.5">Duur *</label>
                  <select value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))}
                    className="w-full border border-espresso/20 bg-cream rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors">
                    <option>60 min</option>
                    <option>90 min</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-espresso/50 block mb-1.5">Opmerkingen</label>
                <textarea value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                  rows={3} className="w-full border border-espresso/20 bg-cream rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors resize-none" placeholder="Eventuele klachten, wensen of vragen…" />
              </div>
              {error && <p className="text-sm text-red-700">{error}</p>}
              <button onClick={submit} disabled={loading || !form.name || !form.email || !form.phone}
                className="w-full bg-espresso text-cream py-4 rounded-sm text-sm font-medium hover:bg-sand transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                {loading ? "Bezig met bevestigen…" : "Bevestig boeking →"}
              </button>
            </div>
          </div>
        )}

        {/* DONE */}
        {step === "done" && (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-sand/20 flex items-center justify-center mx-auto mb-5">
              <span className="text-2xl text-sand">✓</span>
            </div>
            <h4 className="font-serif text-2xl mb-3">Geboekt.</h4>
            <p className="text-espresso/60 text-sm leading-relaxed max-w-xs mx-auto">
              Jouw afspraak op <strong className="text-espresso capitalize">{dateLabel} om {selectedTime}</strong> is bevestigd. Je ontvangt een bevestiging op {form.email}.
            </p>
            <button onClick={() => { setStep("calendar"); setSelectedDate(null); setSelectedTime(null); setForm({ name: "", email: "", phone: "", treatment: "Gezichtsmassage", duration: "60 min", notes: "" }); }}
              className="mt-8 text-xs underline underline-offset-4 text-espresso/50 hover:text-espresso">
              Nog een afspraak maken
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
