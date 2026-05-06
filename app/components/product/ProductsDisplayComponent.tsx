import { Brand, Product } from '@/sanity/types'
import React from 'react'
import HeroSection from './HeroSection'
import ProductGrid from './ProductGrid'
interface ComponentProps {
  isSearchPage?: boolean
  allbrands?: Brand[]
  maxmin?: { maxPrice: number; minPrice: number }
  heading?: string
  products?: Product[]
  currentPage?:string
}
const ProductsDispayComponent = ({
  isSearchPage,
  allbrands,
  maxmin,
  heading,
  products,
  currentPage
}: ComponentProps) => {
  return (
    <div className=''>
      <HeroSection isSearchPage={isSearchPage} />
      <ProductGrid
        brands={allbrands}
        maxmin={maxmin}
        isSearchPage={isSearchPage}
         currentPage={currentPage}
        heading={heading}
        products={products ?? []}
      />
    </div>
  )
}

export default ProductsDispayComponent
