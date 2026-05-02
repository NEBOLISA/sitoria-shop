
import { get } from "http";
import HeroSection from "./components/product/HeroSection";

import PaginationWrapper, { LIMIT } from "./components/product/PaginationWrapper";

import ProductGrid from "./components/product/ProductGrid";
import Slider from "./components/ui/Slider";
import { getBestSellers, getProducts, getProductsByCategory, getProductsBySearch } from "./lib/api/products";


export default async function Home({
  searchParams, category
}: {
  searchParams?: Promise<{ page?: string,search?: string}>;
  category?: string;
}) {
 
 
  const params = await searchParams;
  
  const searchTerm = params?.search || "";
  const page = Number(params?.page) || 1;
  console.log({category})

  const products = await getProducts(page, LIMIT)
  const searchResults = await getProductsBySearch(searchTerm);
  const bestSellers = await getBestSellers();
  
  const categoryProducts = category ? await getProductsByCategory(category) : [];
  console.log({categoryProducts})
  if (searchTerm) {
    return (
      <div className="">
        <HeroSection isSearchPage={true} />
        <ProductGrid isSearchPage={true} currentPage={`search for "${searchTerm}"`} heading={`Search Results for "${searchTerm}"`} products={searchResults} /> 
      </div>
    );
  }
  if (category) {
    return (
      <div className=''>
        <HeroSection isSearchPage={true} />
        <ProductGrid
          isSearchPage={true}
          currentPage={`${category} category`}
          heading={`${category} Products`}
          products={categoryProducts}
        />
      </div>
    )
  }
  console.log({products})
  return (
    <div className="">
      <HeroSection />
      {/* <CategoryRow/> */}
      <section id="best-sellers">

      <ProductGrid heading="Best Sellers" products={bestSellers} />
      </section>
      <Slider />
      <ProductGrid products={products}  />
      <PaginationWrapper/>
    </div>
  );
}
