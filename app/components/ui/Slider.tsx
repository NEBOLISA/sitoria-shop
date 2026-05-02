"use client"
import React, { useEffect } from 'react'
import { Roboto_Flex } from "next/font/google";
import Image from 'next/image';
const sanchez = Roboto_Flex({ subsets: ["latin"], weight: "500" });
const Slider = () => {
  const [currentSlide, setCurrentSlide] = React.useState(1);
  const SLIDE_LENGTH = 2;
  
  const nextSlide = () => {
    setCurrentSlide((prev) => currentSlide > SLIDE_LENGTH - 1 ? currentSlide : prev + 1)
  
  }
  const prevSlide = () => {
    setCurrentSlide((prev) => currentSlide == 1 ? currentSlide: prev - 1)
  
  }
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => currentSlide > SLIDE_LENGTH - 1 ? 1 : prev + 1)
    }, 8000);
    return () => clearInterval(interval);
  }, [currentSlide])
  return (
    <div
      className={`rounded-2xl  max-w-4xl w-[90%] md:h-62.5 sm:h-50 h-37.5 overflow-hidden  transition-all duration-700 ease-in-out relative shadow-md border border-gray-200 mt-20 mb-20  mx-auto  `}
    >

      {/* next and previous slide buttons */}
      <div className=' z-30 flex items-center justify-center gap-4   absolute bottom-4 left-1/2 transform -translate-x-1/2'>
        <button
          onClick={() => prevSlide()}
          className={`    rounded-full  transition-all duration-300 ease-in-out w-3 h-3 ${
            currentSlide === 1
              ? 'bg-white scale-125 '
              : ' bg-white/60 scale-100 hover:bg-white '
          }`}
        ></button>
        <button
          onClick={() => nextSlide()}
          className={` ${
            currentSlide === 2
              ? 'bg-white scale-125 '
              : '  bg-white/60 scale-100 hover:bg-white '
          }   rounded-full  transition-all duration-300 ease-in-out w-3 h-3`}
        ></button>
      </div>


      {/* First slide */}
      <div
        className={`  absolute bg-[url('/slider1.png')]  inset-0 transition-transform duration-1000 ease-in-out ${
          currentSlide === 1 ? 'translate-x-0 ' : '-translate-x-full'
        }`}
      >
        <div className='flex flex-col'>
          {/* First Slide texts */}
          <div className='absolute inset-0'>
            <h1
              className={
                sanchez.className +
                ' text-white capitalize text-sm sm:text-xl md:text-4xl sm:mx-8 mx-2 mt-4 sm:mt-8 font-extrabold '
              }
            >
              Wear Confidence. <br className='md:block hidden' />{' '}
              <span className=''>Leave a Trail.</span>
            </h1>
            <h3
              className={
                sanchez.className +
                ' text-white capitalize text-[9px] sm:text-[12px] md:text-sm mt-1 md:w-[60%] w-[50%] mx-2 sm:mx-8 font-light leading-tight '
              }
            >
              Long-lasting scents designed to elevate your everyday moments into
              something extraordinary.
            </h3>
            <h4
              className={
                'sm:text-xs text-[8px] sm:mt-6 mt-3 sm:mx-8 mx-2 text-white bg-white/20 px-3 py-1 rounded-full w-max'
              }
            >
              #1 Choice for Premium Fragrance
            </h4>
          </div>

          {/* First slide image */}
          <Image
            src='/spray_p3.png'
            alt='Slider Image'
            width={200}
            height={100}
            sizes='100%'
            className={
              ' w-25 sm:w-35 md:w-40  lg:w-45   object-contain bottom-0 absolute right-0 mx-auto   translate-0 left-auto rounded-2xl'
            }
          />
        </div>
      </div>
     
      
      {/* Second slide */}
      <div
        className={`absolute bg-[url('/slider2.png')]  inset-0 transition-transform duration-1000 ease-in-out ${
          currentSlide === 2 ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col'>

          {/* Second slide texts */}
          <div className='absolute inset-0'>
            <h1
              className={
                sanchez.className +
                ' text-white capitalize text-sm sm:text-xl md:text-4xl sm:mx-8 mx-2 mt-4 sm:mt-8 font-extrabold '
              }
            >
              The Scent That Defines You.
            </h1>
            <h3
              className={
                sanchez.className +
                ' text-white capitalize text-[9px] sm:text-[12px] md:text-sm mt-1 md:w-[60%] w-[55%] mx-2 sm:mx-8 font-light leading-tight '
              }
            >
              Discover timeless fragrances crafted to leave a lasting impression
              — elegant, bold, and unforgettable.
            </h3>
            <h3
              className={
                sanchez.className +
                ' text-white capitalize text-[9px] sm:text-[12px] md:text-sm mt-1 md:w-[60%] w-[55%] mx-2 sm:mx-8 font-light leading-tight '
              }
            >
              Experience rich notes, refined blends, and a signature aura that
              speaks before you do.
            </h3>
            <button className='sm:mt-6 mt-3 mx-2 sm:mx-8 sm:px-6 sm:py-1 px-2  cursor-pointer sm:text-sm text-xs font-medium rounded-full sm:border-2 border-1 border-white text-white hover:bg-white hover:text-black transition-colors duration-300'>
              Shop Now
            </button>
          </div>

          {/* Second slide image */}
          <Image
            src='/slider2-person.png'
            alt='Slider Image'
            width={200}
            height={300}
            sizes='100%'
            className={
              ' w-25 sm:w-35 md:w-40  lg:w-45  object-contain bottom-0 absolute right-2 mx-auto   translate-0 left-auto rounded-2xl'
            }
          />
          
        </div>
      </div>
    </div>
  )
}

export default Slider
