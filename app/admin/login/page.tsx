"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const r = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ username, password, token }),
      });
      const data = await r.json();
      if (!r.ok) { setError(data.error); setLoading(false); return; }
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Er ging iets mis. Probeer opnieuw.");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-bone flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="font-serif text-2xl text-espresso mb-1">Massage Lounge</div>
          <div className="text-xs uppercase tracking-widest text-espresso/40">Admin portaal</div>
        </div>

        {/* Card */}
        <div className="bg-cream rounded-sm shadow-sm border border-espresso/10 overflow-hidden">
          <div className="bg-espresso px-8 py-5">
            <h1 className="font-serif text-xl text-cream">Inloggen</h1>
            <p className="text-xs text-cream/50 mt-1">Beveiligd met twee-factor authenticatie</p>
          </div>

          <form onSubmit={submit} className="px-8 py-8 space-y-5">
            <div>
              <label className="text-xs uppercase tracking-wider text-espresso/50 block mb-2">Gebruikersnaam</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="w-full border border-espresso/20 bg-bone rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-espresso/50 block mb-2">Wachtwoord</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="w-full border border-espresso/20 bg-bone rounded-sm px-4 py-3 text-sm focus:outline-none focus:border-espresso transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="border-t border-espresso/10 pt-5">
              <label className="text-xs uppercase tracking-wider text-espresso/50 block mb-2">
                Google Authenticator code
              </label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]{6}"
                maxLength={6}
                value={token}
                onChange={e => setToken(e.target.value.replace(/\D/g, ""))}
                required
                className="w-full border border-espresso/20 bg-bone rounded-sm px-4 py-3 text-sm font-mono tracking-[0.3em] text-center focus:outline-none focus:border-espresso transition-colors"
                placeholder="000 000"
              />
              <p className="text-xs text-espresso/40 mt-2">Open de Authenticator app en voer de 6-cijferige code in.</p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !username || !password || token.length !== 6}
              className="w-full bg-espresso text-cream py-3.5 rounded-sm text-sm font-medium hover:bg-sand transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Bezig met inloggen…" : "Inloggen →"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-espresso/30 mt-6">
          Massage Lounge · Admin portaal · Alleen voor geautoriseerde gebruikers
        </p>
      </div>
    </div>
  );
}
