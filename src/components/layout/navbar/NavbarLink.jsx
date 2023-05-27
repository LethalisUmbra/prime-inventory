import Link from "next/link";
import React from "react";

export default function NavbarLink({ title, href, active }) {
  return (
    <Link
      href={href}
      className={`${
        active ? "text-amber-400" : "text-white"
      } flex items-center justify-center px-2 text-sm border-b-2 border-transparent hover:border-amber-400`}
    >
      {title}
    </Link>
  );
}
