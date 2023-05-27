import React from "react";
import { IoIosArrowBack } from "react-icons/io";

export default function PrevButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className='absolute top-1/2 left-4 z-10 p-2 text-amber-400 border border-amber-400 hover:bg-amber-400 hover:text-black hover:shadow-[0_0_10px_5px_rgba(251,191,36,0.75)] rounded-full transform -translate-y-1/2 transition-all duration-300'
    >
      <IoIosArrowBack className='w-6 h-6' />
    </button>
  );
}
