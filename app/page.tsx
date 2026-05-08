
import { Suspense } from 'react'
import HeroSection from './components/product/HeroSection'
import PaginationWrapper, {
  LIMIT
} from './components/product/PaginationWrapper'

import ProductGrid from './components/product/ProductGrid'
import ProductsDispayComponent from './components/product/ProductsDisplayComponent'
import ProductSkeleton from './components/product/ProductSkeleton'
import FilterDropdown from './components/ui/FilterDropdown'
import Slider from './components/ui/Slider'
import {
  getBestSellers,
  getBrands,
  getMaxandMinPrices,
  getProductsByFilter1,
  getProductsPerPage
} from './lib/api/products'
import { generateText } from './lib/utils/generateHeadingText'
import ProductsWrapper from './components/product/ProductDisplayWrapper'


export default async function Home({
  searchParams,

}: {
  searchParams?: Promise<{
    page?: string
    search?: string
    brand?: string
    price?: string
    size?: string
    category?: string
  }>
}) {
  const params = await searchParams

  const all = await searchParams
  
 
  const searchTerm = params?.search ?? null
  
  const page = Number(params?.page) || 1
  const category = params?.category ?? null
  const rsizes = params?.size?.split(',').filter(Boolean)
  const sizes = rsizes?.length ? rsizes : null

  const rbrands = params?.brand?.split(',').filter(Boolean)
  const brands = rbrands?.length ? rbrands : null

  const price = params?.price?.split('-').map(Number)
  const minPrice = price?.[0] ?? null
  const maxPrice = price?.[1] ?? null
  const filters = [...(sizes ?? []), ...(brands ?? []), price?.join("-")].filter(Boolean) as string[]


  const [maxmin, allbrands] = await Promise.all([
    getMaxandMinPrices(),
    getBrands(),
  ])
  let products = []
  let bestSellers = []
  // let filteredProducts = []

 const isFilterPage = params?.brand || params?.price || params?.size
  const isMainPage = !isFilterPage && !searchTerm && !category
  const isCategoryPage = !!category
  const isSearchPage = !!searchTerm

//   if (isCategoryPage || isSearchPage || isFilterPage) {
    
//   filteredProducts = await getProductsByFilter1({
//     searchTerm,
//     categoryTerm: category ?? null,
//     sizes,
//     brands,
//     minPrice,
//     maxPrice
//   })
// } else {
  products = await getProductsPerPage(page, LIMIT)
  bestSellers = await getBestSellers()
  // }
    const { text, heading } = generateText({
      category: category ?? '',
      search: searchTerm ?? '',
      filters: [all?.brand ?? '', all?.price ?? '', all?.size ?? '']
    }) ?? { text: '', heading: '' }
 

 
  return (
    <div className='relative'>
      <HeroSection isSearchPage={!isMainPage} />
      <FilterDropdown
        maxmin={maxmin!}
        brands={allbrands!}
        isNotMainPage={!isMainPage}
      />
      {isMainPage && (
        <>
          <ProductsDispayComponent
            filters={filters}
            heading={'Best Sellers'}
            products={bestSellers}
          />
          <section id='all-products'>
            <Slider />
            <ProductGrid products={products} heading='all products' />
            <PaginationWrapper />
          </section>
        </>
      )}

      {(isSearchPage || isCategoryPage || isFilterPage) && (
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<ProductSkeleton />}
        >
          <ProductsWrapper
            searchTerm={searchTerm}
            category={category}
            sizes={sizes}
            brands={brands}
            minPrice={minPrice}
            maxPrice={maxPrice}
            heading={heading}
            text={text}
            filters={filters}
          />

          {/* <ProductsDispayComponent
        filters={filters}
        isSearchPage={true}
        currentPage={heading}
        heading={text}
        products={filteredProducts}
      /> */}
        </Suspense>
      )}
    </div>
  )
}


