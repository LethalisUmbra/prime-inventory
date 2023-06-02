"use client";
// React
import { createContext, useCallback, useEffect, useState } from "react";
// Next
import { useRouter } from "next/navigation";
// Cookies
import Cookies from "js-cookie";
import { decodeToken } from "@/lib/jwt";

// Create Context
const Context = createContext();

// Provider
function ContextProvider({ children }) {
  // Router
  const router = useRouter();

  // Variables
  const [user, setUser] = useState();
  const [warframes, setWarframes] = useState();

  const getUser = useCallback(async () => {
    const bearer_token = Cookies.get("Authorization");
    if (!bearer_token) return;

    const decoded = await decodeToken(bearer_token);

    console.log("DECODED", decoded);

    if (!decoded.id) {
      console.log("Error getting user: user not found");
      setUser();
      return;
    }

    setUser(decoded);
  }, []);

  const logout = useCallback(() => {
    Cookies.remove("Authorization");
    setUser();
    router.push("/auth/login");
  }, [router]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    fetch("https://api.warframestat.us/warframes/")
      .then((res) => res.json())
      .then((data) => {
        setWarframes(data.filter((wf) => wf.type === "Warframe"));
      })
      .catch((err) => console.log("Error getting warframes data", err));
  }, []);

  return (
    <Context.Provider value={{ user, getUser, logout, warframes }}>
      {children}
    </Context.Provider>
  );
}

export { Context, ContextProvider };
