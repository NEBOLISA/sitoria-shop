'use client'
import { urlFor } from '@/sanity/lib/image'
import { Product } from '@/sanity/types'
import { motion } from 'framer-motion'
import { CircleX, ChevronDown, ChevronUp, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { useCartStore } from '@/app/store/cartStore'
import ProductTag from './ProductTag'
import { getStockStatus } from '@/app/lib/utils/stock'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Playfair_Display, Outfit } from 'next/font/google'
import { BsTwitterX } from 'react-icons/bs'
import { FaFacebookF } from 'react-icons/fa6'
import { IoLogoWhatsapp } from 'react-icons/io'
import ReviewDropDown from '../ui/ReviewDropDown'
import { useRouter } from 'next/navigation'

const outfit = Outfit({ subsets: ['latin'], weight: '600' })
const ProductDetails = ({
  product,
  onClose,

}: {
  product: Product | null
  onClose: () => void
  
}) => {
  const [url] = useState(
    typeof window !== 'undefined' ? window.location.href : ''
  )

  const cart = useCartStore((state) => state.cart)

  const addToCart = useCartStore((state) => state.addToCart)

  const increaseQty = useCartStore((state) => state.increaseQty)

  const decreaseQty = useCartStore((state) => state.decreaseQty)
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen)
  const [IsReviewDropdownOpen, setIsReviewDropdownOpen] = useState(false)
  const router = useRouter()
  const cartItem = cart.find((item: Product) => item._id === product?._id)
  const quantity = cartItem?.quantity || 0
  const productPrice = cartItem?.price || 0
  const isProductInCart = cart.some(
    (item: Product) => item._id === product?._id
  )
  const finalPrice =
    productPrice * (quantity == 0 ? 1 : quantity) || product?.price || 0
  const stockStatus = getStockStatus(product?.stock || 0)

  const productUrl = url
  const twitterShareUrl = `https://x.com/intent/post?text=${encodeURIComponent(
    `Check out this perfume: ${product?.name}`
  )}&url=${encodeURIComponent(productUrl)}`
  const link =
    'https://x.com/intent/post?url=https%3A%2F%2Fmkirresistibleperfumes.com.ng%2Fproducts%2F24k-and-red-diamond-bodyspray%2F4739412%3Flocation%3D159246'
  const link2 =
    'https://x.com/intent/post?text=Check%20out%20this%20perfume%3A%20Chanel%20No.%205&url=https%3A%2F%2Flocalhost%3A3000%2Fchanel-no-5%2Fcb5d9447-21fd-42d6-bfba-0a73235cef80'
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
          strokeWidth={1.2}
          className='absolute z-40 w-9 h-9 cursor-pointer text-green-500 top-1 right-4  font-medium'
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
            <div className='grid md:grid-cols-[2fr_1.8fr] gap-6 p-4  flex-col md:flex-row overflow-scroll h-full pb-6'>
              <div className=' relative  '>
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
                <h1
                  className={
                    outfit.className +
                    ' text-2xl md:text-3xl font-semibold text-[#1b3022]'
                  }
                >
                  {product?.name}
                </h1>
                <p
                  className={
                    outfit.className +
                    'text-black font-sans  text-3xl md:text-4xl font-semibold'
                  }
                >
                  {finalPrice.toLocaleString('en-NG', {
                    style: 'currency',
                    currency: 'NGN'
                  })}
                </p>
                {product?.body && (
                  <div className=''>
                    <h2 className='text-black font-bold capitalize '>
                      Product Description
                    </h2>
                    <div className='text-sm  leading-relaxed '>
                      <PortableText value={product?.body || []} />
                    </div>
                  </div>
                )}

                <div className='grid lg:grid-cols-[1.2fr_2fr]   items-center  gap-4 mt-4 my-8'>
                  {/* <h1 className='font-semibold'>Quantity:</h1> */}
                  <div className='flex-[0.4]  border border-gray-300 rounded-xl px-3  py-2 flex items-center justify-between gap-5 w-36'>
                    <button
                      disabled={quantity <= 0}
                      onClick={handleDecreaseQty}
                      className={`${
                        quantity <= 0
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'bg-transparent hover:scale-105'
                      }  transition-colors duration-300 ease-in-out text-black  text-xl font-light   rounded-sm cursor-pointer`}
                    >
                      -
                    </button>
                    <span className='text-lg font-medium'>{quantity}</span>
                    <button
                      disabled={quantity >= (product?.stock || 0)}
                      onClick={handleIncreaseQty}
                      className={`${
                        quantity >= (product?.stock || 0)
                          ? 'text-gray-300 cursor-not-allowed'
                          : 'bg-transparent hover:scale-105'
                      } transition-colors duration-300 ease-in-out text-black text-xl font-light  rounded-sm cursor-pointer`}
                    >
                      +
                    </button>
                  </div>
                  <div className='flex-[0.6] '>
                    {!isProductInCart ? (
                      <button
                        onClick={handleAddToCart}
                        className={` bg-transparent w-full flex-[0.5] border  py-2 px-6 hover:scale-105 transition-all duration-500 border-green-500 text-green-500 ease-in-out rounded-md cursor-pointer flex items-center justify-center gap-3 `}
                      >
                        <ShoppingCart /> Add to Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          router.back()
                            setIsCartOpen(true)
                           
                        }}
                        className='bg-green-500 flex-[0.5] w-full hover:scale-105 transition-all duration-500 ease-in-out text-white py-2 px-6 rounded-md cursor-pointer'
                      >
                        Buy Now
                      </button>
                    )}
                  </div>
                </div>

                <div className='flex items-center justify-between'>
                  <h3 className='text-black text-md font-bold'>Reviews</h3>
                  <div className='text-black flex'>
                    <ChevronDown
                      size={16}
                      stroke='black'
                      onClick={() => setIsReviewDropdownOpen(false)}
                      className={`${
                        IsReviewDropdownOpen
                          ? 'visible opacity-100 '
                          : 'hidden opacity-0'
                      } cursor-pointer font-bold  text-black transition-all duration-800 ease-in-out`}
                    />

                    <ChevronUp
                      size={16}
                      onClick={() => setIsReviewDropdownOpen(true)}
                      className={` ${
                        IsReviewDropdownOpen
                          ? 'hidden opacity-0'
                          : ' visible opacity-100 '
                      } cursor-pointer font-bold  transition-all duration-800 ease-in-out`}
                    />
                  </div>
                </div>
                {IsReviewDropdownOpen && (
                  <ReviewDropDown open={IsReviewDropdownOpen} />
                )}
                <div className='mt-4'>
                  <h3 className='font-bold text-md'>Share this Product</h3>
                  <div className='flex items-center gap-4 mt-3'>
                    <button className='w-9 h-9 p-3 flex items-center justify-center cursor-pointer bg-gray-100'>
                      <a
                        href={twitterShareUrl}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <BsTwitterX />
                      </a>
                    </button>
                    <button className='w-9 h-9 p-3 flex items-center justify-center cursor-pointer bg-gray-100'>
                      <FaFacebookF />
                    </button>
                    <button className='w-9 h-9 p-3 flex items-center justify-center cursor-pointer bg-gray-100'>
                      <IoLogoWhatsapp />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default ProductDetails
