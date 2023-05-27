import React from "react";
import Category from "./Category";

const categories = [
  {
    title: "Primary",
    href: "/primary",
    src: "/RubicoPrime.jpg",
  },
  {
    title: "Secondary",
    href: "/secondary",
    src: "/TwinGrakata.png",
  },
  {
    title: "Melee",
    href: "/melee",
    src: "/Melee.jpg",
  },
  {
    title: "Warframes",
    href: "/warframes",
    src: "/MiragePrime.png",
  },
  {
    title: "Archwings",
    href: "/archwings",
    src: "/Archwings.png",
  },
  {
    title: "Companions",
    href: "/companions",
    src: "/HeliosPrime.jpg",
  },
];

export default function Categories() {
  return (
    <div className='container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 w-full my-5 gap-3'>
      {categories?.map((category, index) => (
        <Category category={category} key={index} />
      ))}
    </div>
  );
}
