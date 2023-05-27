import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Category({ category }) {
  return (
    <Link
      className='relative h-36 sm:h-32 md:h-24 lg:h-32 xl:h-36 overflow-hidden text-white hover:text-amber-400 transition-all duration-200 brightness-75 hover:brightness-100 hover:shadow'
      href={category.href}
    >
      <Image
        draggable={false}
        alt={category.title}
        src={"/img" + category.src}
        fill
        sizes='350px'
        className='object-fill'
      />
      <div className='absolute z-10 bg-black bg-opacity-75 bottom-0 w-full py-1 px-3 shadow-[0_0px_15px_15px_rgba(0,0,0,0.75)]'>
        <h1 className='font-medium text-xl md:text-base lg:text-xl bottom-0'>
          {category.title}
        </h1>
      </div>
    </Link>
  );
}
