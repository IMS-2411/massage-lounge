"use client";
import { useEffect, useState } from "react";

const TIME_SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

function nextDays(n: number) {
  const out: { iso: string; label: string; weekday: string }[] = [];
  const d = new Date();
  for (let i = 0; i < n; i++) {
    const day = new Date(d);
    day.setDate(d.getDate() + i);
    out.push({
      iso: day.toISOString().slice(0, 10),
      label: day.toLocaleDateString("nl-NL", { day: "numeric", month: "short" }),
      weekday: day.toLocaleDateString("nl-NL", { weekday: "short" })
    });
  }
  return out;
}

export default function AdminDashboard() {
  const days = nextDays(28);
  const [blocked, setBlocked] = useState<string[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [selected, setSelected] = useState(days[0].iso);

  async function load() {
    const a = await fetch("/api/slots").then(r => r.json());
    setBlocked(a.blocked || []);
    const b = await fetch("/api/bookings").then(r => r.json());
    setBookings(b.bookings || []);
  }
  useEffect(() => { load(); }, []);

  async function toggle(key: string) {
    const r = await fetch("/api/slots", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ key })
    }).then(r => r.json());
    setBlocked(r.blocked);
  }

  async function del(id: string) {
    await fetch(`/api/bookings?id=${id}`, { method: "DELETE" });
    load();
  }

  const dayBlocked = blocked.includes(selected);

  return (
    <div className="grid lg:grid-cols-12 gap-10">
      <div className="lg:col-span-7 space-y-10">
        <div>
          <div className="eyebrow mb-4">Datums</div>
          <div className="grid grid-cols-7 gap-2">
            {days.map(d => {
              const isBlocked = blocked.includes(d.iso);
              const has = bookings.some(b => b.date === d.iso);
              return (
                <button key={d.iso} onClick={() => setSelected(d.iso)}
                  className={`p-3 border rounded-sm text-center transition-all ${selected === d.iso ? "border-espresso bg-espresso text-cream" : "border-espresso/20 hover:border-espresso/50"} ${isBlocked ? "opacity-40" : ""}`}>
                  <div className="text-[10px] uppercase tracking-wider opacity-70">{d.weekday}</div>
                  <div className="font-serif text-lg mt-1">{d.label}</div>
                  {has && <div className="text-[9px] mt-1 text-sand">●</div>}
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="eyebrow">Tijden voor {selected}</div>
            <button onClick={() => toggle(selected)} className="text-xs underline">
              {dayBlocked ? "Hele dag deblokkeren" : "Hele dag blokkeren"}
            </button>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {TIME_SLOTS.map(t => {
              const key = `${selected}|${t}`;
              const isBlocked = blocked.includes(key) || dayBlocked;
              return (
                <button key={t} disabled={dayBlocked} onClick={() => toggle(key)}
                  className={`py-3 border rounded-sm text-sm transition-all ${isBlocked ? "border-espresso/10 text-espresso/30 line-through" : "border-espresso/30 hover:border-espresso"}`}>
                  {t}
                </button>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-espresso/50">Klik een tijd om te blokkeren/deblokkeren.</p>
        </div>
      </div>

      <div className="lg:col-span-5">
        <div className="border border-espresso/15 p-6 rounded-sm bg-bone">
          <div className="eyebrow mb-4">Boekingen ({bookings.length})</div>
          {bookings.length === 0 && <p className="text-sm text-espresso/60">Nog geen boekingen.</p>}
          <ul className="space-y-3 max-h-[600px] overflow-auto">
            {bookings.sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time)).map(b => (
              <li key={b.id} className="border border-espresso/15 bg-cream p-4 rounded-sm">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="font-serif text-lg">{b.name}</div>
                    <div className="text-xs text-espresso/60">{b.date} · {b.time} · {b.duration}</div>
                    <div className="text-xs mt-1">{b.treatment}</div>
                    <div className="text-xs text-espresso/60 mt-1">{b.email} · {b.phone}</div>
                    {b.notes && <div className="text-xs italic mt-2 text-espresso/70">"{b.notes}"</div>}
                  </div>
                  <button onClick={() => del(b.id)} className="text-xs text-red-700 underline">verwijder</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
