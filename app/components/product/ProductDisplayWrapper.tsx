// app/components/ProductsWrapper.tsx
"use client"


import { getProductsByFilter1 } from '@/app/lib/api/products'
import ProductsDispayComponent from './ProductsDisplayComponent'
import { useEffect, useState } from 'react'
import { useUIStore } from '@/app/store/useUIStore'

interface Props {
  searchTerm?: string | null
  category?: string | null
  sizes?: string[] | null
  brands?: string[] | null
  minPrice?: number | null
  maxPrice?: number | null
  heading: string
  text: string
  filters: string[]
}

export default  function ProductsWrapper({
  searchTerm,
  category,
  sizes,
  brands,
  minPrice,
  maxPrice,
  heading,
  text,
  filters
}: Props) {
// simulate loading
//await new Promise((resolve) => setTimeout(resolve, 8000))
const [filteredProducts, setFilteredProducts] = useState([])
  
    const setIsCategoryLoading = useUIStore(
      (state) => state.setIsCategoryLoading
    )
    useEffect(() => {
        const fetchProducts = async () => {
            
       try {
        
           const products = await getProductsByFilter1({
             searchTerm,
             categoryTerm: category,
             sizes,
             brands,
             minPrice,
             maxPrice
           })
           setFilteredProducts(products)
       } catch (error) {
        console.error(error)
       } finally {
           setIsCategoryLoading(null)
       }
  }
  fetchProducts()
}, [searchTerm, category, sizes, brands, minPrice, maxPrice,setIsCategoryLoading])
    
  return (
    <ProductsDispayComponent
      filters={filters}
      isSearchPage
      currentPage={heading}
      heading={text}
      products={filteredProducts}
    />
  )
}
