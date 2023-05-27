"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import Link from "next/link";
import { Context } from "@/context";

const slugify = (str) => {
  str = str.toLowerCase().trim(); // Convierte a minúsculas y elimina espacios en blanco al inicio y al final
  str = str
    .replace(/[^a-z0-9 -]/g, "") // Elimina caracteres especiales
    .replace(/\s+/g, "-") // Reemplaza espacios por guiones
    .replace(/-+/g, "-"); // Reemplaza múltiples guiones por uno solo
  return str;
};

export default function RegisterPage() {
  // Context
  const { getUser } = useContext(Context);
  // Router
  const router = useRouter();

  // Variable definition
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState();

  // Submit form
  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (password1 !== password2) {
        throw new Error("Passwords do not match");
      }
      // Register request
      const res = await fetch(`/api/auth/register`, {
        method: "POST",
        body: JSON.stringify({ username, email, password: password1 }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      // Validate status
      if (!res.ok) {
        throw new Error(data.error);
      }

      // Create token
      Cookies.set("token", data.token);
      getUser();
      router.push("/");
    } catch (e) {
      console.log("Error:", e);
      setError(e.message);
    }
  };

  useEffect(() => {
    if (!password1 || !password2) return;
    setError(password1 === password2 ? undefined : "Passwords do not match");
  }, [password1, password2]);

  return (
    <>
      <div className='bg-white rounded-lg shadow-md py-2 px-4 flex flex-col gap-3 max-w-xs w-full'>
        <h1 className='text-2xl font-semibold'>Register</h1>
        <hr />
        <form onSubmit={onSubmit} className='flex flex-col gap-3'>
          <input
            required
            type='text'
            name='prime-inventory_username'
            className='border border-gray-300 rounded-md py-1 px-2 hover:border-gray-400 focus:border-amber-400 focus:outline-none transition-all duration-300'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            required
            type='email'
            name='prime-inventory_email'
            className='border border-gray-300 rounded-md py-1 px-2 hover:border-gray-400 focus:border-amber-400 focus:outline-none transition-all duration-300'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            required
            type='password'
            name='prime-inventory_password1'
            className='border border-gray-300 rounded-md py-1 px-2  hover:border-gray-400 focus:border-amber-400 focus:outline-none transition-all duration-300'
            placeholder='Password'
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
          />
          <input
            required
            type='password'
            name='prime-inventory_password2'
            className='border border-gray-300 rounded-md py-1 px-2  hover:border-gray-400 focus:border-amber-400 focus:outline-none transition-all duration-300'
            placeholder='Confirm password'
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
          <span className='text-xs h-2 text-red-500 mx-auto font-semibold'>
            {error}
          </span>
          <input
            disabled={password1 !== password2}
            type='submit'
            value={"Sign up"}
            className='rounded-md py-1 px-2 border border-amber-400 text-amber-400 font-medium hover:bg-amber-400 hover:text-white hover:shadow transition-all duration-300 cursor-pointer mb-3 disabled:bg-gray-300 disabled:text-gray-600 disabled:border-gray-600'
          />
        </form>
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
