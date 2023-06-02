import Image from "next/image";
import React from "react";

export default function Slide({ element, visible, isVideo }) {
  return (
    <div>
      {isVideo ? (
        <video
          className={`w-full -translate-y-32 transition-all duration-300 ease-in ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          loop
          muted
        >
          <source src={element.src} type='video/webm' />
          Tu navegador no soporta la reproducción de videos.
        </video>
      ) : (
        <Image
          draggable={false}
          src={element.src}
          alt={element.description}
          fill
          className={`object-cover transition-all duration-300 ease-in ${
            visible ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
      <div
        className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-10 drop-shadow text-white text-center transition-all duration-500 ease-in-out ${
          visible ? "opacity-100" : "opacity-0 translate-y-5"
        }`}
        style={{ textShadow: "0 0 3px #000, 0 0 5px #000" }}
      >
        <h2 className='text-2xl font-bold mb-2'>{element.title}</h2>
        <p className='text-lg'>{element.description}</p>
      </div>
    </div>
  );
}
