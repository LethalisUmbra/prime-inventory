"use client";
import { Context } from "@/context";
import { useContext, useEffect } from "react";

export default function Logout() {
  const { logout } = useContext(Context);

  useEffect(() => {
    logout();
  }, [logout]);
}
