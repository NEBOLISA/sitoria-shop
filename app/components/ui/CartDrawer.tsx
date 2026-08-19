'use client'

import { urlFor } from '@/sanity/lib/image'
import { Product } from '@/sanity/types'
import { motion, AnimatePresence } from 'framer-motion'
import { IoMdArrowRoundForward } from 'react-icons/io'


import Image from 'next/image'
import { useCartStore } from '@/app/store/cartStore';
import { Trash2 } from 'lucide-react';
import EmptyCart from './EmptyCart';
import React, { useState } from 'react';
import { ConfirmDialog } from './ConfirmDialog';


interface CartDrawerProps {
  setView: (view: number) => void
  onClose: () => void
  cart: CartItem[]
}
interface CartItem extends Product {
  quantity: number
  calculatedPrice: number
}

export default function CartDrawer({ onClose, cart,setView }: CartDrawerProps) {
  
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
    <>
      {/* 🔲 Backdrop */}

      {/* 🛒 Cart Panel */}

      {/* Header */}

      {/* Cart Items */}
      {cart.length !== 0 ? (
        <>
          <div className='flex-1 overflow-y-auto p-4 space-y-6'>
            {cart.map((item, index) => (
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
                  onClick={() => {
                    setIsRemoveItemDialogOpen(true)
                    setItemToRemoveId(item?._id)
                  }}
                >
                  <Trash2 />
                </button>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className='pb-4 px-4 pt-1 border-t '>
            <div className='flex justify-between text-black mb-2 font-medium'>
              <span className='text-sm text-gray-500'>Total</span>
              <span>
                ₦
                {cart
                  .reduce(
                    (total, item) => total + (item.price ?? 0) * item.quantity,
                    0
                  )
                  .toLocaleString()}
              </span>
            </div>
            <div className='grid w-full grid-cols-[1.5fr_1fr] gap-3 '>
              <button
                onClick={() => setView(1)}
                className='w-full cursor-pointer bg-green-500 text-white py-1.5 rounded-full font-semibold flex items-center justify-center gap-2'
              >
                Proceed to Checkout <IoMdArrowRoundForward />
              </button>
              <button
                onClick={() => {
                  setIsClearCartDialogOpen(true)
                }}
                className='w-full cursor-pointer mt-1.5 border border-red-500 text-red-500 
                    py-1.5 rounded-full font-semibold'
              >
                Clear Cart
              </button>
            </div>
          </div>
        </>
      ) : (
        <EmptyCart onClick={onClose} />
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
          onClose={() => setIsClearCartDialogOpen(false)}
        />
      )}
      {isRemoveItemDialogOpen && (
        <ConfirmDialog
          promptMessage='Are you sure you want to remove this item from the cart?'
          confirmText='Remove Item'
          discardText='Cancel'
          action={() => {
            removeFromCart(itemToRemoveId!)
            setIsRemoveItemDialogOpen(false)
          }}
          onClose={() => setIsRemoveItemDialogOpen(false)}
        />
      )}
    </>
  )
}
