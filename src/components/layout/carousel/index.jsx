"use client";
import { useState, useEffect, useCallback } from "react";
import PrevButton from "./buttons/PrevButton";
import NextButton from "./buttons/NextButton";
import Slide from "./Slide";

const images = [
  {
    id: 1,
    src: "/img/PrimeResurgence.jpg",
    title: "Título de la imagen 1",
    description: "Descripción de la imagen 1",
  },
  {
    id: 2,
    src: "/img/CarouselNewWar.jpg",
    title: "Título de la imagen 2",
    description: "Descripción de la imagen 2",
  },
  {
    id: 3,
    src: "/img/LethalisGit.jpg",
    title: "Título de la imagen 3",
    description: "Descripción de la imagen 3",
  },
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  const handlePrevClick = () => {
    if (currentIndex === 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = useCallback(() => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  }, [currentIndex]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isPlaying) {
        handleNextClick();
      }
    }, 10000);
    return () => clearInterval(intervalId);
  }, [currentIndex, isPlaying, handleNextClick]);

  return (
    <div className='relative w-full' style={{ height: "520px" }}>
      <Slide element={images[currentIndex]} />
      <PrevButton onClick={handlePrevClick} />
      <NextButton onClick={handleNextClick} />
    </div>
  );
}
