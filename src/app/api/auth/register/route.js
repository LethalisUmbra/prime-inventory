// import { NextResponse } from 'next/server';
// import crypto from 'crypto'
// import db from '@/lib/db'
// import { generateToken } from '@/lib/jwt'

// const slugify = (str) => {
//   str = str.toLowerCase().trim();
//   str = str
//     .replace(/[^a-z0-9 -]/g, "")
//     .replace(/\s+/g, "-")
//     .replace(/-+/g, "-");
//   return str;
// };

// const createUser = async (userData) => {
//   try {
//     const sql = 'INSERT INTO users SET ?';
//     const [result] = await db.query(sql, userData);
//     const createdUser = { id: result.insertId, ...userData };
//     return createdUser;
//   } catch (error) {
//     throw error;
//   }
// };


// export async function POST(request) {
//   const { username, email, password } = await request.json();
//   const hash = crypto.createHash('sha256').update(password).digest('hex');
//   try {
//     // 1. Create user data
//     const slug = slugify(username)
//     const userData = { name: username, slug, email, password: hash };
//     // 2. Create user
//     const user = await createUser(userData)
//     // 4. Generate token
//     const token = generateToken(user);
//     // 5. Return token
//     return NextResponse.json({ token });
//   } catch (error) {
//     return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { 'Content-Type': 'application/json' } })
//   }
// }
