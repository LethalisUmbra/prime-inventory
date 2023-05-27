import { NextResponse } from 'next/server';
import { decodeToken } from '@/lib/jwt'

export async function GET(req) {
  const bearer_token = req.cookies.get('Authorization')?.value;
  try {
    const decoded = decodeToken(bearer_token)
    return NextResponse.json(decoded);
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
  }
}
