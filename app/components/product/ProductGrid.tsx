'use client'
import { Poppins } from 'next/font/google'
import ProductCard from './ProductCard'
import { Product } from '@/sanity/types'
import { useEffect, useState } from 'react'
import ProductDetails from './ProductDetails'
import { getProductById } from '@/app/lib/api/products'
import { House } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
const poppins = Poppins({ subsets: ['latin'], weight: '500' })

interface ProductGridProps {
  heading?: string
  products: Product[]
  currentPage?: string
  isSearchPage?:boolean
}
const ProductGrid = ({ heading, products,currentPage, isSearchPage}: ProductGridProps) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  )
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  
 
  useEffect(() => {
    if (selectedProductId) {
      getProductById(selectedProductId).then((product) => {
        setSelectedProduct(product)
      })
    }
  }, [selectedProductId])

  return (
    <div>
      <div className='max-w-4xl mt-8  w-[90%] mx-auto  '>
        {isSearchPage && (
          <div className='flex items-center gap-4'>
            <Link href='/'>
              <House size={18} className='text-gray-600' />
            </Link>
            <ChevronRight size={18} className='text-gray-600' />
            <h3 className='uppercase font-light text-md text-gray-600'>
              {currentPage}
            </h3>
          </div>
        )}
        <h2
          className={
            poppins.className +
            ` text-lg md:text-xl  capitalize text-text mt-6 mb-2 `
          }
        >
          {heading}
        </h2>
        {products.length === 0 ? (
          <div className='w-full h-[30vh] text-2xl text-black flex items-center justify-center'>
            No products found
          </div>
        ) : (
          <div
            className={`${
              products.length < 3 ? '' : 'justify-between'
            } w-full  space-y-3 mt-6 flex flex-wrap md:gap-4  `}
          >
            {products?.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                onclick={() => setSelectedProductId(product._id)}
              />
            ))}
          </div>
        )}
        {selectedProductId && (
          <ProductDetails
            product={selectedProduct}
            onClose={() => {
              setSelectedProductId(null)
              setSelectedProduct(null)
            }}
          />
        )}
      </div>
    </div>
  )
}

export default ProductGrid
