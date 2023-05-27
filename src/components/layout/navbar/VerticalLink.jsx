import Link from "next/link";
import React from "react";

export default function VerticalLink({ href, children, active }) {
  return (
    <Link
      href={href}
      className={`${
        active ? "text-amber-400" : "text-white"
      } flex items-center py-2 px-4 rounded-lg text-sm border-2 border-transparent hover:bg-neutral-900 transition-all`}
    >
      {children}
    </Link>
  );
}
