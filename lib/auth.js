// Auth helpers — password check + JWT session cookies
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const SESSION_COOKIE = 'elite-path-session';
const SESSION_DURATION_DAYS = 7;

function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
}

// Verify password against stored bcrypt hash (from env var)
export async function verifyPassword(plaintext) {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) {
    throw new Error('ADMIN_PASSWORD_HASH environment variable is not set');
  }
  return bcrypt.compare(plaintext, hash);
}

// Hash a new password (used once during setup)
export async function hashPassword(plaintext) {
  return bcrypt.hash(plaintext, 12);
}

// Create a JWT session token
export async function createSession() {
  return new SignJWT({ role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_DAYS}d`)
    .sign(getSecret());
}

// Verify a session token from cookie
export async function verifySession(token) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload;
  } catch (e) {
    return null;
  }
}

export const SESSION_CONFIG = {
  name: SESSION_COOKIE,
  maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60, // in seconds
};
