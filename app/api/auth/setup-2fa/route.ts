import { NextResponse } from "next/server";
import { generateURI } from "otplib";
import QRCode from "qrcode";
import { getSession } from "@/lib/auth";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Niet ingelogd." }, { status: 401 });

  const secret = process.env.TOTP_SECRET!;
  const uri = generateURI({ issuer: "Massage Lounge", label: "admin", secret });
  const qr = await QRCode.toDataURL(uri);

  return NextResponse.json({ qr, secret });
}
