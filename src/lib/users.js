"use server";
import { db } from "@vercel/postgres";

export async function getUsers() {
  "use server";
  try {
    const client = await db.connect();
    const { rows } = await client.sql`SELECT * FROM users`;
    return { users: rows };
  } catch (error) {
    console.log("Error getting users: ", error);
    return { error: error.message };
  }
}