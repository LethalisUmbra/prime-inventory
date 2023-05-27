import Link from "next/link";
import { useState } from "react";
import { FaCaretDown } from "react-icons/fa";

export default function DropdownLink({ text, links, active }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div
      className='relative'
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type='button'
        className={`inline-flex gap-1 h-full items-center justify-center w-full text-sm border-b-2 ${
          isOpen ? "border-amber-400" : "border-transparent"
        } ${active ? "text-amber-400" : "text-white"} px-2`}
        id='options-menu'
        aria-haspopup='true'
        aria-expanded='true'
      >
        {text}
        <FaCaretDown size={16} />
      </button>
      <div
        className={`${
          isOpen ? "" : "hidden"
        } absolute z-10 rounded-b-md bg-neutral-700 shadow-lg overflow-hidden`}
      >
        {links.map((link) => (
          <Link
            key={link.text}
            href={link.href}
            className={`flex px-4 py-2 text-sm ${
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
