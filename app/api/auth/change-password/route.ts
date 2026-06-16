import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { verifyPassword, updatePassword } from "@/lib/credentials";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });

  const { currentPassword, newPassword } = await req.json();

  if (!currentPassword || !newPassword) {
    return NextResponse.json({ error: "Vul alle velden in." }, { status: 400 });
  }

  if (newPassword.length < 8) {
    return NextResponse.json({ error: "Nieuw wachtwoord moet minimaal 8 tekens zijn." }, { status: 400 });
  }

  const valid = await verifyPassword(currentPassword);
  if (!valid) {
    return NextResponse.json({ error: "Huidig wachtwoord klopt niet." }, { status: 401 });
  }

  await updatePassword(newPassword);
  return NextResponse.json({ ok: true });
}
