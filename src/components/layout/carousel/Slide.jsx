import Image from "next/image";
import React from "react";

export default function Slide({ element }) {
  return (
    <>
      <Image
        draggable={false}
        src={element.src}
        alt={element.description}
        fill
        className='object-cover'
      />
      <div className='absolute bottom-3 left-1/2 -translate-x-1/2 z-10 p-2 bg-black bg-opacity-50 text-white text-center'>
        <h2 className='text-xl font-bold mb-2'>{element.title}</h2>
        <p className='text-sm'>{element.description}</p>
      </div>
    </>
  );
}
