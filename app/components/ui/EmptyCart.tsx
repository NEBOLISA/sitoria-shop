"use client"
import { useCartStore } from '@/app/store/cartStore'
import Image from 'next/image'


const EmptyCart = ({ onClick }: { onClick: () => void }) => {
    const scrollToBestSellers = useCartStore((state) => state.scrollToBestSellers)
  return (
      <div className='flex flex-col items-center justify-center w-full h-full'>
          <Image
              src="/empty-cart.png"
              alt="Empty Cart"
              width={200}
              height={200}
              className="object-contain"
          />
          <p className='text-gray-500 text-lg mt-4'>Your cart is currently empty.</p>
          <button onClick={() => { onClick(); scrollToBestSellers(); }} className='cursor-pointer mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition'>
              Start Shopping
          </button>
      </div>
      

  )
}

export default EmptyCart
