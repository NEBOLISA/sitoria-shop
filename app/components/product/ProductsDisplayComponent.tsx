"use client"
import { Brand, Product } from '@/sanity/types'

import ProductGrid from './ProductGrid'
interface ComponentProps {
  isSearchPage?: boolean
  allbrands?: Brand[]
  maxmin?: { maxPrice: number; minPrice: number }
  heading?: string
  products?: Product[]
  currentPage?: string
  filters?:string[]
}
const ProductsDispayComponent = ({
  isSearchPage,
 
  heading,
  products,
  currentPage,
  filters
}: ComponentProps) => {
 
  return (
    <div className=''>
      {/* <HeroSection isSearchPage={isSearchPage} /> */}
      <ProductGrid
        filters={filters}
        isSearchPage={isSearchPage}
         currentPage={currentPage}
        heading={heading}
        products={products ?? []}
      />
    </div>
  )
}

export default ProductsDispayComponent
