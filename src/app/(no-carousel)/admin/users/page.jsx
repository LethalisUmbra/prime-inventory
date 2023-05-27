import UsersTable from "@/components/users/table";
import { db } from "@vercel/postgres";

export default async function UsersPage() {
  const client = await db.connect();
  let users;

  try {
    const { rows } = await client.sql`SELECT * FROM users`;
    console.log("Rows", rows);
    users = rows;
  } catch (error) {
    console.log("Error getting users", error);
  }

  return <UsersTable users={users} />;
}
