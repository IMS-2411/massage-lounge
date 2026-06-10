import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
const BOOKINGS = path.join(DATA_DIR, "bookings.json");
const BLOCKED = path.join(DATA_DIR, "blocked.json");

function ensure() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(BOOKINGS)) fs.writeFileSync(BOOKINGS, "[]");
  if (!fs.existsSync(BLOCKED)) fs.writeFileSync(BLOCKED, "[]");
}

export type Booking = {
  id: string;
  name: string;
  email: string;
  phone: string;
  treatment: string;
  duration: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm
  notes?: string;
  createdAt: string;
};

export function getBookings(): Booking[] {
  ensure();
  return JSON.parse(fs.readFileSync(BOOKINGS, "utf8"));
}
export function addBooking(b: Omit<Booking, "id" | "createdAt">): Booking {
  ensure();
  const all = getBookings();
  const entry: Booking = { ...b, id: crypto.randomUUID(), createdAt: new Date().toISOString() };
  all.push(entry);
  fs.writeFileSync(BOOKINGS, JSON.stringify(all, null, 2));
  return entry;
}
export function deleteBooking(id: string) {
  ensure();
  const all = getBookings().filter(b => b.id !== id);
  fs.writeFileSync(BOOKINGS, JSON.stringify(all, null, 2));
}

// Blocked slot = "YYYY-MM-DD" (whole day) or "YYYY-MM-DD|HH:mm" (single slot)
export function getBlocked(): string[] {
  ensure();
  return JSON.parse(fs.readFileSync(BLOCKED, "utf8"));
}
export function setBlocked(list: string[]) {
  ensure();
  fs.writeFileSync(BLOCKED, JSON.stringify(list, null, 2));
}
export function toggleBlocked(key: string) {
  const list = getBlocked();
  const i = list.indexOf(key);
  if (i >= 0) list.splice(i, 1);
  else list.push(key);
  setBlocked(list);
  return list;
}

export const TIME_SLOTS = ["10:00", "11:30", "13:00", "14:30", "16:00", "17:30"];

export function isSlotAvailable(date: string, time: string) {
  const blocked = getBlocked();
  if (blocked.includes(date)) return false;
  if (blocked.includes(`${date}|${time}`)) return false;
  const taken = getBookings().some(b => b.date === date && b.time === time);
  return !taken;
}
