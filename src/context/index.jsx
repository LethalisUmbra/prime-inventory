"use client";
// React
import { createContext, useCallback, useEffect, useState } from "react";
// Next
import { useRouter } from "next/navigation";
// Cookies
import Cookies from "js-cookie";

// Create Context
const Context = createContext();

// Provider
function ContextProvider({ children }) {
  // Router
  const router = useRouter();

  // Variables
  const [user, setUser] = useState();
  const [warframes, setWarframes] = useState();

  const getUser = useCallback(() => {
    const bearer_token = Cookies.get("Authorization");
    if (!bearer_token) return;

    fetch(`/api/auth/decode`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.id) {
          throw new Error("user not found");
        }
        setUser(data);
      })
      .catch((err) => {
        console.log("Error getting user:", err.message);
        setUser();
      });
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
