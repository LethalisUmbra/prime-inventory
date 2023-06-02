"use client";
import { useState, useEffect, useCallback } from "react";
import PrevButton from "./buttons/PrevButton";
import NextButton from "./buttons/NextButton";
import Slide from "./Slide";

const images = [
  {
    id: 1,
    src: "/img/LethalisGit.jpg",
    title: "PrimeInventory is a fan page",
    description: "Developed by LethalisUmbra",
    isVideo: false,
  },
  {
    id: 2,
    src: "/carousel/duviri-paradox-launch-cutdown.webm",
    title: "The Duviri Paradox",
    description: "Available now on all platforms",
    isVideo: true,
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
    <div
      className='relative w-full bg-black overflow-hidden'
      style={{ height: "520px" }}
    >
      {images.map((image, key) => (
        <Slide
          element={image}
          key={key}
          visible={key === currentIndex}
          isVideo={image.isVideo}
        />
      ))}
      {/* <Slide element={images[currentIndex]} /> */}
      <PrevButton onClick={handlePrevClick} />
      <NextButton onClick={handleNextClick} />
    </div>
  );
}
