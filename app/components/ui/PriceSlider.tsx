'use client'

import { useState } from 'react'
import { Slider } from '@/components/ui/slider'
interface SliderProps{
    price: number[],
    MIN: number,
    MAX: number,
    handlePrice:(val:number[])=>void
}
export default function PriceSlider({price,MIN,MAX,handlePrice}:SliderProps) {
 
  return (
    <div className='space-y-4'>
      {/* <h3 className='font-semibold'>Price</h3> */}
      <div className='flex justify-between items-center'>
        <span>
          {price[0]?.toLocaleString('en-NG', {
            style: 'currency',
            currency: 'NGN'
          })}
        </span>
        <span>
          {price[1]?.toLocaleString('en-NG', {
            style: 'currency',
            currency: 'NGN'
          })}
        </span>
      </div>
      <Slider
        min={MIN}
        max={MAX}
        step={1000}
        value={price}
        onValueChange={(val) => {
          handlePrice(val)
          
        }}
      />

      {/* <div className='flex justify-between text-sm'>
        <span>₦{price[0]}</span>
        <span>₦{price[1]}</span>
      </div> */}
    </div>
  )
}
