"use client";
import { useState } from "react";
import AdminHeader from "@/components/AdminHeader";

function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (next !== confirm) {
      setStatus("error");
      setMessage("Nieuwe wachtwoorden komen niet overeen.");
      return;
    }
    setStatus("loading");
    const res = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentPassword: current, newPassword: next }),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("ok");
      setMessage("Wachtwoord succesvol gewijzigd.");
      setCurrent(""); setNext(""); setConfirm("");
    } else {
      setStatus("error");
      setMessage(data.error ?? "Er ging iets mis.");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <div>
        <label className="block text-xs uppercase tracking-widest text-espresso/50 mb-2">
          Huidig wachtwoord
        </label>
        <input
          type="password"
          value={current}
          onChange={e => setCurrent(e.target.value)}
          required
          className="w-full bg-bone border border-espresso/15 rounded-sm px-4 py-3 text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-espresso/40 transition-colors"
          placeholder="••••••••"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-espresso/50 mb-2">
          Nieuw wachtwoord
        </label>
        <input
          type="password"
          value={next}
          onChange={e => setNext(e.target.value)}
          required
          minLength={8}
          className="w-full bg-bone border border-espresso/15 rounded-sm px-4 py-3 text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-espresso/40 transition-colors"
          placeholder="Minimaal 8 tekens"
        />
      </div>
      <div>
        <label className="block text-xs uppercase tracking-widest text-espresso/50 mb-2">
          Herhaal nieuw wachtwoord
        </label>
        <input
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          required
          className="w-full bg-bone border border-espresso/15 rounded-sm px-4 py-3 text-sm text-espresso placeholder:text-espresso/30 focus:outline-none focus:border-espresso/40 transition-colors"
          placeholder="••••••••"
        />
      </div>

      {status !== "idle" && status !== "loading" && (
        <div className={`rounded-sm px-4 py-3 text-sm ${status === "ok" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
          {message}
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full bg-espresso text-cream py-3 rounded-sm text-sm hover:bg-sand disabled:opacity-50 transition-all"
      >
        {status === "loading" ? "Bezig…" : "Wachtwoord wijzigen"}
      </button>
    </form>
  );
}

export default function InstellingenPage() {
  return (
    <div className="min-h-screen bg-bone">
      <AdminHeader />
      <main className="pt-24 pb-32">
        <div className="container-x max-w-2xl">
          <span className="eyebrow">Admin</span>
          <h1 className="h-display text-5xl md:text-6xl mt-3 mb-12">Instellingen</h1>

          {/* Password section */}
          <section className="bg-cream rounded-sm overflow-hidden shadow-sm mb-8">
            <div className="bg-espresso px-8 py-5">
              <h2 className="font-serif text-xl text-cream">Wachtwoord wijzigen</h2>
              <p className="text-cream/50 text-sm mt-1">Voer je huidige wachtwoord in en kies een nieuw wachtwoord.</p>
            </div>
            <div className="px-8 py-8">
              <PasswordForm />
            </div>
          </section>

          {/* 2FA info section */}
          <section className="bg-cream rounded-sm overflow-hidden shadow-sm">
            <div className="bg-espresso px-8 py-5">
              <h2 className="font-serif text-xl text-cream">Twee-factor authenticatie</h2>
              <p className="text-cream/50 text-sm mt-1">Google Authenticator instellen of opnieuw koppelen.</p>
            </div>
            <div className="px-8 py-8">
              <p className="text-sm text-espresso/70 mb-6">
                Gebruik de <strong>2FA Setup</strong> knop rechtsboven om de QR code opnieuw te scannen
                met de Google Authenticator app. De huidige TOTP secret blijft actief totdat je hem
                vervangt via de omgevingsvariabelen.
              </p>
              <div className="bg-bone rounded-sm px-5 py-4">
                <div className="text-xs uppercase tracking-widest text-espresso/40 mb-1">Handmatige secret code</div>
                <code className="font-mono text-sm text-espresso tracking-widest">
                  {process.env.NEXT_PUBLIC_TOTP_HINT ?? "Beschikbaar via 2FA Setup →"}
                </code>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
