import bcrypt from "bcryptjs";

// In-memory override — persists for the lifetime of the server instance.
// On cold start the env var password is used as fallback.
let passwordHash: string | null = null;

export async function verifyPassword(candidate: string): Promise<boolean> {
  if (passwordHash) {
    return bcrypt.compare(candidate, passwordHash);
  }
  // Fall back to plain-text env var (initial setup)
  return candidate === process.env.ADMIN_PASSWORD;
}

export async function updatePassword(newPassword: string): Promise<void> {
  passwordHash = await bcrypt.hash(newPassword, 12);
}
