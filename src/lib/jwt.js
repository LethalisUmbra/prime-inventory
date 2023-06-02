"use server";
import { verify } from 'jsonwebtoken';

async function decodeToken(bearer_token) {
  try {
    const token = decodeURIComponent(bearer_token.split(" ")[1])
    const secret = process.env.JWT_SECRET;
    const { password, ...rest } = verify(token, secret)
    return rest;
  } catch (error) {
    return { error }
  }
}

function base64urlToUint8Array(base64url) {
  const padding = '='.repeat((4 - base64url.length % 4) % 4);
  const base64 = (base64url + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function verifyToken(bearer_token) {
  const token = decodeURIComponent(bearer_token.split(" ")[1])
  const [headerB64, payloadB64, signatureB64] = token.split('.');
  const signature = base64urlToUint8Array(signatureB64);
  const secret = process.env.JWT_SECRET;

  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    ['verify']
  );

  const payload = JSON.parse(Buffer.from(payloadB64, 'base64'));
  const now = Math.floor(Date.now() / 1000);
  if (payload.exp && now >= payload.exp) {
    throw new Error('Token expired');
  }

  const isSignatureValid = await crypto.subtle.verify(
    { name: 'HMAC' },
    key,
    signature,
    new TextEncoder().encode(`${headerB64}.${payloadB64}`)
  );

  if (!isSignatureValid) {
    throw new Error('Invalid signature');
  }

  return true;
}

export { decodeToken, verifyToken }