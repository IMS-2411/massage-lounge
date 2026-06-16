import { NextRequest, NextResponse } from "next/server";
import { verify } from "otplib";
import { setSession } from "@/lib/auth";
import { verifyPassword } from "@/lib/credentials";

export async function POST(req: NextRequest) {
  const { username, password, token } = await req.json();

  const usernameOk = username === process.env.ADMIN_USERNAME;
  const passwordOk = await verifyPassword(password);

  if (!usernameOk || !passwordOk) {
    return NextResponse.json({ error: "Onjuiste inloggegevens." }, { status: 401 });
  }

  const secret = process.env.TOTP_SECRET!;
  const result = await verify({ secret, token });

  if (!result.valid) {
    return NextResponse.json({ error: "Ongeldige authenticatiecode." }, { status: 401 });
  }

  await setSession({ role: "admin", username });
  return NextResponse.json({ ok: true });
}
