import UsersTable from "@/components/users/table";
import { db } from "@vercel/postgres";

async function getUsers() {
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

export default async function UsersPage() {
  return <UsersTable getUsers={getUsers} />;
}
