import React from 'react'
import HeroSection from './HeroSection'
import ProductGrid from './ProductGrid'
import Slider from '../ui/Slider'
import PaginationWrapper from './PaginationWrapper'
import { Brand, Product } from '@/sanity/types'
interface ProductListProps {
  maxmin: { maxPrice: number; minPrice: number }
  allbrands: Brand[]
    products: Product[],
    bestSellers:Product[]
}
const ProductList = ({maxmin,allbrands,products,bestSellers}:ProductListProps) => {
  return (
    <div>
      <HeroSection />
      {/* <CategoryRow/> */}
      <section id='best-sellers'>
        <ProductGrid
          maxmin={maxmin}
          brands={allbrands}
          heading='Best Sellers'
          products={bestSellers}
        />
      </section>
      <Slider />
      <ProductGrid products={products} />
      <PaginationWrapper />
    </div>
  )
}

export default ProductList
