'use client'

import { motion, AnimatePresence } from 'framer-motion'
import CartDrawer from './CartDrawer'
import Checkout from './Checkout'
import { Product } from '@/sanity/types'
import { useState } from 'react'
import { X } from 'lucide-react'
import { IoChevronBackOutline } from 'react-icons/io5'

import { Playfair_Display } from 'next/font/google'
interface CartandCheckoutStepperProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
}
interface CartItem extends Product {
  quantity: number
  calculatedPrice: number
}
  const playfair = Playfair_Display({ subsets: ['latin'], weight: '900' })
export default function CartandCheckoutStepper({
  isOpen,
  onClose,
  cart
}: CartandCheckoutStepperProps) {

  const [view, setView] = useState(0)
  const views = [CartDrawer, Checkout]
  const CurrentView = views[view]
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 🔲 Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className='fixed inset-0 bg-black z-30'
          />

          {/* 🛒 Cart Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className='fixed top-1/2 -translate-y-1/2 sm:right-4 sm:left-auto sm:translate-x-0 left-1/2 -translate-x-1/2 sm:h-[95vh] sm:w-110  h-[80vh] w-[90%] bg-white z-40 shadow-xl flex flex-col rounded-lg overflow-hidden'
          >
            <div className='flex justify-between items-center p-4 border-b border-gray-200 text-black'>
              {view === 1 && (
                <div
                  onClick={() => setView(0)}
                  className='flex items-center cursor-pointer justify-center rounded-full border p-1 border-gray-400'
                >
                  <IoChevronBackOutline
                    fontSize={8}
                    className=' w-5 h-5 cursor-pointer  text-gray-500  font-extralight'
                  />
                </div>
              )}
              <h2 className={playfair.className + 'text-lg font-semibold'}>
                {view === 0 ? 'My Cart' : 'Checkout'}
              </h2>
              <div
                onClick={onClose}
                className='flex items-center cursor-pointer justify-center rounded-full border p-1 border-gray-400'
              >
                <X
                  fontSize={8}
                  className=' w-5 h-5 cursor-pointer  text-gray-500  font-extralight'
                />
              </div>
            </div>

           
            <CurrentView onClose={onClose} cart={cart} setView={setView} />

            {/* <div className='flex justify-center items-center gap-4 p-4 border-t border-gray-200'>
              <button
                onClick={() => setView(0)}
                className={`px-4 py-2 rounded-lg ${
                  view === 0 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                Cart
              </button>
              <button
                onClick={() => setView(1)}
                className={`px-4 py-2 rounded-lg ${
                  view === 1 ? 'bg-green-700 text-white' : 'bg-gray-200 text-gray-600'
                }`}
              >
                Checkout
              </button>
            </div> */}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
