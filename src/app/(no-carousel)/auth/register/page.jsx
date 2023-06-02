// Next
import Link from "next/link";
// Vercel
import { sql } from "@vercel/postgres";
// Crypto
import crypto from "crypto";
// JWT
import { sign } from "jsonwebtoken";
// Components
import RegisterForm from "@/components/auth/RegisterForm";

const slugify = (str) => {
  str = str.toLowerCase().trim();
  str = str
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
  return str;
};

export default function RegisterPage() {
  // Submit form
  const register = async ({ username, email, password }) => {
    "use server";
    // Hash password using sha256
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    // Slugify username
    const slug = slugify(username);
    try {
      // Create query to get user
      const { rows: rowsInsert } =
        await sql`INSERT INTO users (id, name, slug, email, password) VALUES (uuid_generate_v4(), ${username}, ${slug}, ${email}, ${hash}) RETURNING id;`;

      // If no rows then throw an error
      if (rowsInsert.length === 0)
        throw new Error("Error registering user. Please try again");

      // Create query to get user
      const { rows: payload } =
        await sql`SELECT * FROM users WHERE id = ${rowsInsert[0].id};`;

      // If no rows then throw an error
      if (payload.length === 0)
        throw new Error("Error getting registered user.");

      // Generate Token
      const token = sign(payload[0], process.env.JWT_SECRET, {
        expiresIn: "30d",
      });

      // Validate token exists
      if (!token) return new Error("Error creating token: ", token);

      // Return token as an object
      return { token };
    } catch (error) {
      // Handle error returning its message as an object
      return { error: error.message };
    }
  };

  return (
    <>
      <div className='bg-white rounded-lg shadow-md py-2 px-4 flex flex-col gap-3 max-w-xs w-full'>
        <h1 className='text-2xl font-semibold'>Register</h1>
        <hr />
        <RegisterForm register={register} />
      </div>
      <Link
        href={"/auth/login"}
        className='text-sm text-gray-500 hover:text-amber-400 transition-all duration-300 my-3'
      >
        Already have an account?
      </Link>
    </>
  );
}
