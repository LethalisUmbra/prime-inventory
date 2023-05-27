import Carousel from "@/components/layout/carousel";
import Categories from "@/components/layout/categories";

export default function HomeLayout({ children }) {
  return (
    <div className='flex flex-col gap-2 justify-between w-full h-full'>
      <div>
        <Carousel />
        <Categories />
      </div>
      <div className='container mx-auto flex flex-col justify-between items-center'>
        {children}
      </div>
    </div>
  );
}
