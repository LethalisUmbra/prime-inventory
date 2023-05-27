import Link from "next/link";

export default function AdminItem({ children, title, href = "#", className }) {
  return (
    <Link
      href={href}
      className={`bg-white p-10 rounded-lg shadow flex flex-col gap-5 items-center justify-center  hover:bg-gray-200 hover:shadow-inner hover:drop-shadow transition-all ${className}`}
    >
      {children}
      <h2>{title}</h2>
    </Link>
  );
}
