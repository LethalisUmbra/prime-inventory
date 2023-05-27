import { NextResponse } from 'next/server';
import { db } from "@vercel/postgres";
import { verifyToken, decodeToken } from '@/lib/jwt'

export async function GET(req) {
  const client = await db.connect();

  try {
    const token = req.cookies.get('Authorization')?.value;
    if (!token || !await verifyToken(token)) {
      return new Response(JSON.stringify({ error: "token required" }), { status: 401, headers: { 'Content-Type': 'application/json' } })
    }

    const { is_admin } = decodeToken(token);
    if (!is_admin) {
      return new Response(JSON.stringify({ error: "not enough privileges" }), { status: 403, headers: { 'Content-Type': 'application/json' } })
    }

    const { rows: users } = await client.sql`SELECT * from users`;
    return NextResponse.json(users);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { headers: { 'Content-Type': 'application/json' } })
  }
}
