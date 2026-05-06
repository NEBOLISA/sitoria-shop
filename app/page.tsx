import HeroSection from './components/product/HeroSection'

import PaginationWrapper, {
  LIMIT
} from './components/product/PaginationWrapper'

import ProductGrid from './components/product/ProductGrid'
import ProductsDispayComponent from './components/product/ProductsDisplayComponent'
import FilterDropdown from './components/ui/FilterDropdown'
import Slider from './components/ui/Slider'
import {
  getBestSellers,
  getBrands,
  getMaxandMinPrices,
  getProducts,
  getProductsByCategory,
  getProductsByFilter,
  getProductsBySearch,
  getProductsPerPage
} from './lib/api/products'

export default async function Home({
  searchParams,
  category
}: {
  searchParams?: Promise<{
    page?: string
    search?: string
    brand?: string
    price?: string
    size?: string
  }>
  category?: string
}) {
  const params = await searchParams

  const searchTerm = params?.search || ''
  const page = Number(params?.page) || 1

  const rsizes = params?.size?.split(',').filter(Boolean)
  const sizes = rsizes?.length ? rsizes : null

  const rbrands = params?.brand?.split(',').filter(Boolean)
  const brands = rbrands?.length ? rbrands : null

  const price = params?.price?.split('-').map(Number)
  const minPrice = price?.[0] ?? null
  const maxPrice = price?.[1] ?? null


  const maxmin = await getMaxandMinPrices()
  const allbrands = await getBrands()
  const filteredProducts = await getProductsByFilter({
    sizes,
    brands,
    minPrice,
    maxPrice
  })
  console.log(params?.brand)
  const products = await getProductsPerPage(page, LIMIT)
  const bestSellers = await getBestSellers()
  const searchResults = await getProductsBySearch(searchTerm)
  const categoryProducts = category ? await getProductsByCategory(category) : []

  const isFilterPage = params?.brand || params?.price || params?.size
  const isMainPage = !isFilterPage && !searchTerm && !category
  const isCategoryPage = !!category
  const isSearchPage = !!searchTerm
  return (
    <div className='relative'>
      <FilterDropdown
        maxmin={maxmin!}
        brands={allbrands!}
        isNotMainPage={!isMainPage}
      />
      {isMainPage && (
        <>
          <ProductsDispayComponent
            // allbrands={allbrands}
            heading={'Best Sellers'}
            products={bestSellers}
          />
          <section id='all-products'>
            <Slider />
            <ProductGrid products={products} />
            <PaginationWrapper />
          </section>
        </>
      )}
      {isSearchPage && (
        <>
          <HeroSection isSearchPage={true} />
          <ProductGrid
            isSearchPage={true}
            // brands={allbrands}
            // maxmin={maxmin}
            currentPage={`search for "${searchTerm}"`}
            heading={`Search Results for "${searchTerm}"`}
            products={searchResults}
          />
        </>
      )}
      {isCategoryPage && (
        <>
          <HeroSection isSearchPage={true} />
          <ProductGrid
            // brands={allbrands}
            // maxmin={maxmin}
            isSearchPage={true}
            currentPage={`${category} category`}
            heading={`${category} Category`}
            products={categoryProducts}
          />
        </>
      )}
      {isFilterPage && (
        <>
          <HeroSection isSearchPage={true} />
          <ProductGrid
            brands={allbrands}
            isSearchPage={true}
            maxmin={maxmin}
            currentPage={`filter page`}
            heading={`Filter Results for "${''}"`}
            products={filteredProducts}
          />
        </>
      )}
    </div>
  )
}
