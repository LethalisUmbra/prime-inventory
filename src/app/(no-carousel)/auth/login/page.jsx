import { setUser } from "@/lib/user";
import Link from "next/link";
import crypto from "crypto";
import { sql } from "@vercel/postgres";
import LoginForm from "@/components/auth/LoginForm";
import { sign } from "jsonwebtoken";

export default function LoginPage() {
  // Submit form
  const login = async ({ username, password }) => {
    "use server";
    const hash = crypto.createHash("sha256").update(password).digest("hex");
    try {
      const { rows } =
        await sql`SELECT * FROM users WHERE name = ${username} AND password = ${hash};`;
      if (rows.length === 0)
        throw new Error(
          "The login credentials are not valid. Please try again."
        );

      const { password, ...rest } = rows[0];
      const token = sign(rest, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
      setUser(`bearer ${token}`);

      return { token };
    } catch (error) {
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
