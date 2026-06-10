import { NextRequest, NextResponse } from "next/server";
import { TIME_SLOTS, isSlotAvailable, getBlocked, toggleBlocked } from "@/lib/store";

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get("date");
  if (!date) return NextResponse.json({ slots: TIME_SLOTS, blocked: getBlocked() });
  const slots = TIME_SLOTS.map(t => ({ time: t, available: isSlotAvailable(date, t) }));
  return NextResponse.json({ date, slots });
}

export async function POST(req: NextRequest) {
  const { key } = await req.json();
  if (!key) return NextResponse.json({ error: "missing key" }, { status: 400 });
  const list = toggleBlocked(key);
  return NextResponse.json({ blocked: list });
}
