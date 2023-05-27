import Link from "next/link";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export default function VerticalDropdownLink({ text, links, active }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type='button'
        className={`flex items-center gap-1 w-full hover:bg-neutral-900 text-sm py-2 px-4 ${
          active ? "text-amber-400" : "text-white"
        } ${isOpen ? "bg-neutral-900 rounded-t-lg" : "rounded-lg"}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {text}
        <FaCaretDown size={16} />
      </button>
      <div
        className={`${
          isOpen ? "" : "hidden"
        } rounded-b-md bg-neutral-700 shadow-lg transition ease-in-out duration-300`}
      >
        {links.map((link) => (
          <Link
            key={link.text}
            href={link.href}
            className={`flex px-6 py-2 text-sm ${
              link.active
                ? "text-amber-400 hover:text-amber-200"
                : "text-gray-200 hover:text-white"
            } hover:bg-neutral-800 border border-transparent hover:border-amber-400`}
          >
            {link.text}
          </Link>
        ))}
      </div>
    </div>
  );
}
