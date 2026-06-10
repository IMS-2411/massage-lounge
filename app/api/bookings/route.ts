import { NextRequest, NextResponse } from "next/server";
import { addBooking, getBookings, deleteBooking, isSlotAvailable } from "@/lib/store";

export async function GET() {
  return NextResponse.json({ bookings: getBookings() });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, treatment, duration, date, time, notes } = body;
  if (!name || !email || !phone || !treatment || !duration || !date || !time) {
    return NextResponse.json({ error: "Vul alle verplichte velden in." }, { status: 400 });
  }
  if (!isSlotAvailable(date, time)) {
    return NextResponse.json({ error: "Dit moment is niet meer beschikbaar." }, { status: 409 });
  }
  const booking = addBooking({ name, email, phone, treatment, duration, date, time, notes });
  return NextResponse.json({ booking });
}

export async function DELETE(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "missing id" }, { status: 400 });
  deleteBooking(id);
  return NextResponse.json({ ok: true });
}
