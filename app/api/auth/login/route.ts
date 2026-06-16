import { NextRequest, NextResponse } from "next/server";
import { verify } from "otplib";
import { setSession } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const { username, password, token } = await req.json();

  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
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
