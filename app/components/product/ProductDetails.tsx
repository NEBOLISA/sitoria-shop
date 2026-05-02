'use client'
import { urlFor } from '@/sanity/lib/image'
import { Product } from '@/sanity/types'
import { motion } from 'framer-motion'
import { CircleX , ChevronDown, ChevronUp} from 'lucide-react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
  import {useCartStore} from "@/app/store/cartStore";
import ProductTag from './ProductTag'
import { getStockStatus } from '@/app/lib/utils/stock'
import { useState } from 'react'

const ProductDetails = ({
  product,
  onClose
}: {
  product: Product | null
  onClose: () => void
    }) => {
  const { cart, addToCart, increaseQty, decreaseQty } = useCartStore()
  const [IsReviewDropdownOpen,setIsReviewDropdownOpen] = useState(false)
   const cartItem = cart.find((item:Product) => item._id === product?._id)
    const quantity = cartItem?.quantity || 0
    const productPrice = cartItem?.price || 0
   const isProductInCart = cart.some((item:Product) => item._id === product?._id)
    const finalPrice =  productPrice * (quantity == 0 ? 1 : quantity) || product?.price || 0
    const stockStatus = getStockStatus(product?.stock || 0)
        const handleAddToCart = () => {
            if (product) {
                addToCart(product)
            }
        }

    const handleIncreaseQty = () => {
        
            if (product?._id) {
                if (quantity === 0) {
                    addToCart(product)
                } else {
                    increaseQty(product?._id)
                }
             
            }
          
           
        }

        const handleDecreaseQty = () => {
            if (product?._id) {
                decreaseQty(product?._id)
                
            }
        }
       
    console.log({cart})
    return (
      <div className='overflow-hidden'>
        <div
          className='fixed inset-0  bg-black/50 backdrop-blur-sm z-50'
          onClick={onClose}
        ></div>
        <motion.div
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.4 }}
          className='fixed inset-0 bg-white z-50 top-8  sm:top-24 rounded-t-4xl sm:p-8 '
        >
          <CircleX
            className='absolute w-9 h-9 cursor-pointer text-green-500 top-1 right-4  font-medium'
            onClick={onClose}
          />
          {!product && (
            <div className='w-full h-full text-lg flex justify-center items-center text-green-400'>
              {' '}
              <div className='w-6 h-6 border-4 border-green-300 border-t-transparent rounded-full animate-spin'></div>
            </div>
          )}
          {product && (
            <>
              <div className='flex gap-6 p-4  flex-col md:flex-row overflow-scroll h-full pb-6'>
                <div className='flex-1 relative  '>
                  <ProductTag stockStatus={stockStatus!} product={product!} />
                  <Image
                    src={
                      product
                        ? product.mainImage?.asset?._ref
                          ? urlFor(product.mainImage.asset._ref).url()
                          : '/placeholder.png'
                        : '/placeholder.png'
                    }
                    alt={product?.name || 'Product Image'}
                    width={400}
                    height={400}
                    className='object-contain md:h-96 h-56 rounded-lg'
                  />
                </div>
                <div className='flex flex-1 flex-col gap-4 w-full '>
                  <h1 className='text-4xl font-bold'>{product?.name}</h1>
                  <p className='text-lg text-green-500 font-bold'>
                    {finalPrice.toLocaleString('en-NG', {
                      style: 'currency',
                      currency: 'NGN'
                    })}
                  </p>
                  {product?.body && (
                    <div className=''>
                      <h2 className='text-black font-bold capitalize mb-3'>
                        Product Description
                      </h2>
                      <PortableText value={product?.body || []} />
                    </div>
                  )}

                  <div className='flex items-center gap-4 mt-4 my-8'>
                    <h1 className='font-semibold'>Quantity:</h1>
                    <button
                      disabled={quantity <= 0}
                      onClick={handleDecreaseQty}
                      className={`${
                        quantity <= 0
                          ? 'bg-green-200 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-400'
                      }  transition-colors duration-300 ease-in-out text-white py-0.5 text-2xl font-light px-3.5 rounded-sm cursor-pointer`}
                    >
                      -
                    </button>
                    <span className='text-lg font-medium'>{quantity}</span>
                    <button
                      disabled={quantity >= (product?.stock || 0)}
                      onClick={handleIncreaseQty}
                      className={`${
                        quantity >= (product?.stock || 0)
                          ? 'bg-green-200 cursor-not-allowed'
                          : 'bg-green-500 hover:bg-green-400'
                      } transition-colors duration-300 ease-in-out text-white py-0.5 text-2xl font-light px-3.5 rounded-sm cursor-pointer`}
                    >
                      +
                    </button>
                  </div>

                  <div className='flex sm:flex-row flex-col gap-4 mt-4 w-full justify-center '>
                    {!isProductInCart && (
                      <button
                        onClick={handleAddToCart}
                        className={` bg-transparent flex-[0.5] border  py-2 px-6 hover:scale-105 transition-all duration-500 border-green-500 text-green-500 ease-in-out rounded-md cursor-pointer `}
                      >
                        Add to Cart
                      </button>
                    )}
                    <button className='bg-green-500 flex-[0.5] hover:scale-105 transition-all duration-500 ease-in-out text-white py-2 px-6 rounded-md cursor-pointer'>
                      Buy Now
                    </button>
                  </div>
                  <button className='flex items-center justify-between'>
                    <h3 className='text-black text-sm font-bold'>Reviews</h3>
                    {IsReviewDropdownOpen ? (
                      <ChevronDown
                        size={16}
                        onClick={() => setIsReviewDropdownOpen(false)}
                        className={`cursor-pointer font-bold transition-all duration-500 ease-in-out`}
                      />
                    ) : (
                      <ChevronUp
                        size={16}
                        onClick={() => setIsReviewDropdownOpen(true)}
                        className={`cursor-pointer font-bold transition-all duration-500 ease-in-out`}
                      />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      </div>
    )
}

export default ProductDetails
