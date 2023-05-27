"use client";
import Cookies from "js-cookie";
import { useState } from "react";

export default function LoginForm({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await login({ username, password });
    if (res.error) {
      setError(res.error);
    }

    document.cookie = `Authorization=bearer ${encodeURIComponent(
      res.token
    )}; path=/;`;
  };

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
        type='password'
        name='prime-inventory_password'
        className='border border-gray-300 rounded-md py-1 px-2  hover:border-gray-400 focus:border-amber-400 focus:outline-none transition-all duration-300'
        placeholder='Password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && (
        <span className='text-xs text-red-500 mx-auto font-semibold'>
          {error}
        </span>
      )}
      <input
        type='submit'
        value={"Log in"}
        className='rounded-md py-1 px-2 border border-amber-400 text-amber-400 font-medium hover:bg-amber-400 hover:text-white hover:shadow transition-all duration-300 cursor-pointer'
      />
    </form>
  );
}
