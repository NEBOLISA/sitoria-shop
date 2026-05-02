'use client'

import { urlFor } from '@/sanity/lib/image'
import { Product } from '@/sanity/types'
import { motion, AnimatePresence } from 'framer-motion'
import { Playfair_Display } from "next/font/google";
import {  X } from 'lucide-react'
import Image from 'next/image'
import { useCartStore } from '@/app/store/cartStore';
import { Trash2 } from 'lucide-react';
import EmptyCart from './EmptyCart';
import { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';


interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
}
interface CartItem extends Product {
  quantity: number
  calculatedPrice: number
}
const playfair = Playfair_Display({ subsets: ['latin'], weight: '900' })
export default function CartDrawer({ isOpen, onClose, cart }: CartDrawerProps) {
  
  const { removeFromCart, clearCart, increaseQty, decreaseQty } = useCartStore()
  const [isClearCartDialogOpen, setIsClearCartDialogOpen] = useState(false)
  const [isRemoveItemDialogOpen, setIsRemoveItemDialogOpen] = useState(false)
  const [itemToRemoveId, setItemToRemoveId] = useState<string | null>(null)
  const handleIncreaseQty = (item: CartItem) => {
    if (item?._id) {
     
        increaseQty(item?._id)
    }
  }
    const handleDecreaseQty = (item: CartItem) => {
      if (item?._id) {
        decreaseQty(item?._id)
      }
    }
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
            className='fixed top-1/2 -translate-y-1/2 right-2 h-[95vh] w-[350px] bg-white z-40 shadow-xl flex flex-col rounded-lg overflow-hidden'
          >
            {/* Header */}
            <div className='flex justify-between items-center p-4 border-b border-gray-200 text-black'>
              <h2 className={playfair.className + 'text-lg font-semibold'}>
                My Cart
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

            {/* Cart Items */}
            {cart.length !== 0 ? (
              <>
                <div className='flex-1 overflow-y-auto p-4 space-y-6'>
                  {cart.map((item,index) => (
                    <div key={item._id + index} className='flex gap-4'>
                      {/* Image */}
                      <Image
                        width={20}
                        height={20}
                        src={urlFor(item.mainImage?.asset?._ref || '').url()}
                        alt={item.name || 'Product Image'}
                        className='w-20 h-20 object-cover rounded-md'
                      />

                      {/* Details */}
                      <div className='flex-1'>
                        <h3 className='font-medium text-black'>{item.name}</h3>
                        <p className='text-gray-500 text-sm'>
                          ₦{item?.calculatedPrice?.toLocaleString()}
                        </p>

                        {/* Quantity Controls */}
                        <div className='flex items-center gap-3 mt-2'>
                          <button
                            disabled={item.quantity <= 1}
                            onClick={() => handleDecreaseQty(item)}
                            className={`${
                              item?.quantity <= 1
                                ? 'bg-green-200 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-400 cursor-pointer'
                            }   text-white px-3 py-1 rounded`}
                          >
                            -
                          </button>

                          <span className='text-black'>{item.quantity}</span>

                          <button
                            disabled={item?.quantity >= (item?.stock ?? 0)}
                            onClick={() => handleIncreaseQty(item)}
                            className={`${
                              item?.quantity >= (item?.stock ?? 0)
                                ? 'bg-green-200 cursor-not-allowed'
                                : 'bg-green-500 hover:bg-green-400 cursor-pointer'
                            }   text-white px-3 py-1 rounded`}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Delete */}
                      <button
                        className='cursor-pointer text-red-500 text-xl'
                        onClick={() => {setIsRemoveItemDialogOpen(true); setItemToRemoveId(item?._id)}}
                      >
                        <Trash2 />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className='p-4 border-t'>
                  <div className='flex justify-between text-black mb-4 font-medium'>
                    <span>Total</span>
                    <span>
                      ₦
                      {cart
                        .reduce(
                          (total, item) =>
                            total + (item.price ?? 0) * item.quantity,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </div>

                  <button className='w-full cursor-pointer bg-green-500 text-white py-3 rounded-full font-semibold'>
                    Proceed
                  </button>
                  <button
                    onClick={() => { setIsClearCartDialogOpen(true); }}
                    className='w-full cursor-pointer mt-3 border border-red-500 text-red-500 py-3 rounded-full font-semibold'
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            ) : (
              <EmptyCart onClick={onClose} />
            )}
          </motion.div>
        </>
      )}
      {isClearCartDialogOpen && (
        <ConfirmDialog
          promptMessage='Are you sure you want to clear the cart?'
          confirmText='Clear Cart '
          discardText='Cancel'
          action={() => {
            clearCart()
            setIsClearCartDialogOpen(false)
          }}
          onClose={() =>setIsClearCartDialogOpen(false)}
        />
      )}
      {
        isRemoveItemDialogOpen && (
          <ConfirmDialog
            promptMessage='Are you sure you want to remove this item from the cart?'
            confirmText='Remove Item'
            discardText='Cancel'
            action={() => {
              removeFromCart(itemToRemoveId!)
              setIsRemoveItemDialogOpen(false)
            }}
            onClose={() =>setIsRemoveItemDialogOpen(false)}
          />
        )
      }
    </AnimatePresence>
  )
}
