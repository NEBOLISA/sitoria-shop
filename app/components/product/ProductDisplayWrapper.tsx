// app/components/ProductsWrapper.tsx



import { getProductsByFilter1 } from '@/app/lib/api/products'
import ProductsDispayComponent from './ProductsDisplayComponent'

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

export default async function ProductsWrapper({
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

  const filteredProducts = await getProductsByFilter1({
    searchTerm,
    categoryTerm: category,
    sizes,
    brands,
    minPrice,
    maxPrice
  })

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
