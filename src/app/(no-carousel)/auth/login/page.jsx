// Next
import Link from "next/link";
// Vercel
import { sql } from "@vercel/postgres";
// Crypto
import crypto from "crypto";
// JWT
import { sign } from "jsonwebtoken";
// Components
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  // Submit form
  const login = async ({ username, password }) => {
    "use server";
    // Hash password using sha256
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    try {
      // Create query to get user
      const { rows } =
        await sql`SELECT * FROM users WHERE name = ${username} AND password = ${hash};`;

      // If no rows then throw an error
      if (rows.length === 0)
        throw new Error(
          "The login credentials are not valid. Please try again."
        );

      // Get user payload discarding password
      const { password, ...rest } = rows[0];

      // Generate Token
      const token = sign(rest, process.env.JWT_SECRET, {
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
        <h1 className='text-2xl font-semibold'>Login</h1>
        <hr />
        <LoginForm login={login} />
        <hr />
        <Link
          className='mx-auto text-sm text-gray-500 hover:text-amber-400 transition-all duration-300'
          href={"/auth/register"}
        >
          Sign up
        </Link>
      </div>
      <Link
        href={"/auth/recovery"}
        className='text-sm text-gray-500 hover:text-amber-400 transition-all duration-300 my-2'
      >
        Forgot password?
      </Link>
    </>
  );
}
