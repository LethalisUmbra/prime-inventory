"use client";
import { Context } from "@/context";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";

export default function RegisterForm({ register }) {
  // Router
  const router = useRouter();

  // Context
  const { getUser } = useContext(Context);

  // States
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [error, setError] = useState();

  // Function to submit form
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password1 !== password2) {
      throw new Error("Passwords do not match");
    }

    // Send credentals to register async function and get the response
    const res = await register({ username, email, password: password1 });

    // Check if the response contains an error
    if (res.error) {
      setError(res.error);
      return;
    }

    // Store token in cookie
    document.cookie = `Authorization=bearer ${encodeURIComponent(
      res.token
    )}; path=/;`;

    // GetUser from Context
    getUser();

    // Redirect user to Home
    router.push("/");
  };

  useEffect(() => {
    if (!password1 || !password2) return;
    setError(password1 === password2 ? undefined : "Passwords do not match");
  }, [password1, password2]);

  return (
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
  );
}
