"use client";
import { Context } from "@/context";
import React, { useContext } from "react";

export default function ProfilePage() {
  // Context
  const { user } = useContext(Context);

  return (
    user && (
      <div className='mx-auto bg-white rounded-lg shadow p-5'>
        <h1>{user.name}</h1>
      </div>
    )
  );
}
