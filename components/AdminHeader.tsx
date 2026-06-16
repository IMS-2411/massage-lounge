"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminHeader() {
  const router = useRouter();
  const [showSetup, setShowSetup] = useState(false);
  const [qr, setQr] = useState<string | null>(null);
  const [secret, setSecret] = useState<string | null>(null);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  async function loadSetup() {
    const r = await fetch("/api/auth/setup-2fa").then(r => r.json());
    setQr(r.qr);
    setSecret(r.secret);
    setShowSetup(true);
  }

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-espresso text-cream border-b border-cream/10">
        <div className="container-x flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Link href="/" className="font-serif text-base">Massage Lounge</Link>
            <span className="text-cream/30">·</span>
            <span className="text-xs uppercase tracking-widest text-cream/50">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={loadSetup}
              className="text-xs text-cream/50 hover:text-cream transition-colors underline underline-offset-4"
            >
              2FA Setup
            </button>
            <Link
              href="/admin/instellingen"
              className="text-xs text-cream/50 hover:text-cream transition-colors underline underline-offset-4"
            >
              Instellingen
            </Link>
            <button
              onClick={logout}
              className="text-xs border border-cream/20 px-4 py-2 rounded-full hover:bg-cream hover:text-espresso transition-all"
            >
              Uitloggen
            </button>
          </div>
        </div>
      </header>

      {/* 2FA setup modal */}
      {showSetup && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4" onClick={() => setShowSetup(false)}>
          <div className="bg-cream rounded-sm max-w-sm w-full p-8 shadow-xl" onClick={e => e.stopPropagation()}>
            <h2 className="font-serif text-2xl mb-2">Google Authenticator</h2>
            <p className="text-sm text-espresso/60 mb-6">Scan de QR code met de Google Authenticator app om 2FA in te stellen.</p>
            {qr && <img src={qr} alt="2FA QR Code" className="mx-auto w-48 h-48 mb-6" />}
            {secret && (
              <div className="bg-bone rounded-sm px-4 py-3 text-center mb-6">
                <div className="text-xs text-espresso/50 mb-1 uppercase tracking-wider">Handmatige code</div>
                <code className="font-mono text-sm tracking-widest text-espresso">{secret}</code>
              </div>
            )}
            <p className="text-xs text-espresso/40 text-center mb-6">Na het scannen verschijnt er een 6-cijferige code die elke 30 seconden verandert.</p>
            <button
              onClick={() => setShowSetup(false)}
              className="w-full bg-espresso text-cream py-3 rounded-sm text-sm hover:bg-sand transition-all"
            >
              Sluiten
            </button>
          </div>
        </div>
      )}
    </>
  );
}
