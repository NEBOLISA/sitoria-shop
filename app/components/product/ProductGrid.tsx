'use client'
import { Poppins } from 'next/font/google'
import ProductCard from './ProductCard'
import {Product } from '@/sanity/types'
import { useEffect, useState } from 'react'
import ProductDetails from './ProductDetails'
import { getProductById } from '@/app/lib/api/products'
import { House } from 'lucide-react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

const poppins = Poppins({ subsets: ['latin'], weight: '500' })

interface ProductGridProps {
  heading?: string
  products: Product[]
  currentPage?: string
  isSearchPage?: boolean,
  filters?:string[]
 
}
const ProductGrid = ({ heading, products,currentPage, isSearchPage,filters}: ProductGridProps) => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null
  )
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  // const filters = entries.filter(item => item != "")
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
            <h3 className='uppercase font-light md:text-md text-sm text-gray-600'>
              {currentPage}
            </h3>
          </div>
        )}
        <div className='flex justify-between items-center'>
          <h2
            className={
              poppins.className +
              ` sm:text-md text-xs md:text-lg truncate w-50 md:w-full capitalize  mt-6 mb-2 `
            }
          >
            {heading}
            {filters?.map((item, id) => (
              <div className=' inline-flex ' key={id}>
                <p className='flex border-gray-200 border px-2 py-0.5 ml-2 '>
                  {item}
                </p>
              </div>
            ))}
          </h2>
        </div>

        {products.length === 0 ? (
          <div className='w-full h-[30vh] text-2xl text-black flex items-center justify-center'>
            No products found
          </div>
        ) : (
          <div
            className={` w-full  space-y-3 gap-3 mt-6 grid sm:grid-cols-3 grid-cols-2  flex-wrap md:gap-4  `}
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
