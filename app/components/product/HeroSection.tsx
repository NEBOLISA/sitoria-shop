
import Image from 'next/image'
import { Playfair_Display } from "next/font/google";

import SearchBar from '../ui/SearchBar';
import { Suspense } from 'react';
import ProductSkeleton from './ProductSkeleton';

const playfair = Playfair_Display({ subsets: ["latin"],weight: "900" });

const HeroSection = ({ isSearchPage }: { isSearchPage?: boolean }) => {
   
  return (
      <div className={`relative w-full ${isSearchPage ? 'md:h-100 h-80' : 'md:h-130 h-80'}  top-0`}>
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/40 to-transparent z-30"></div>
      <Image
      src="/hero.PNG"
      alt="Perfume"
              fill
              sizes='100%'
      className="object-cover  md:object-center"
      />
         
          <div className='absolute text-center md:w-full w-[85%] h-max z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
        <p className={playfair.className + ' text-white md:text-6xl text-3xl  font-black w-full '} >Elegance in Every Drop</p>
         <Suspense
          key={JSON.stringify("searchbar")}
          fallback={<ProductSkeleton />}
        >

            <SearchBar/>
        </Suspense>
          </div>
         
    </div>
  )
}

export default HeroSection
