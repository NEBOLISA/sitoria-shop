// lib/api/products.ts

import { client } from '@/sanity/lib/client'
import {
  bestSellersQuery,
  getBrandsQuery,
  getCategoryQuery,
  getProductByIdQuery,
  getProductBySearchQuery,
  getProductsByCategoryQuery,
  getProductsByPageQuery,
  getTotal,
  getMaxandMinPricesQuery,
  getProductsByFilterQuery,
  getProductsByFilterQuery1,

} from '@/sanity/lib/queries'

export async function getProductsPerPage(page: number, limit: number) {
  const start = (page - 1) * limit
  const end = start + limit

  return await client.fetch(getProductsByPageQuery, { start, end })
}
export async function getProducts({
  searchTerm,
  category
}: {
  searchTerm?: string
  category?: string
  sizes?: string
  brands?: string
  minPrice?: string
  maxPrice?: string
}) {
  let query = `*[_type == "product"`
  if (searchTerm) {
    query += ` && name match "${searchTerm}*"`
  }
  if (category) {
    query += `&& ${category} in categories[]->slug.current`
  }
  query += `] | order(price asc)`
  return await client.fetch(query)
}
export async function getBrands() {
  return await client.fetch(getBrandsQuery)
}
export async function getMaxandMinPrices() {
  return await client.fetch(getMaxandMinPricesQuery)
}
export async function getProductById(id: string | null) {
  return await client.fetch(getProductByIdQuery, { id })
}
export async function getBestSellers() {
  return await client.fetch(bestSellersQuery)
}

export async function getProductsByFilter({
  sizes,
  brands,
  minPrice,
  maxPrice
}: {
  sizes: string[] | null
  brands: string[] | null
  minPrice: number | null
  maxPrice: number | null
    }) {
    
  return await client.fetch(getProductsByFilterQuery, {
    sizes,
    brands,
    minPrice,
    maxPrice
  })
}
export async function getTotalCount() {
  return await client.fetch<number>(getTotal)
}

export const getProductsBySearch = async (searchTerm: string) => {
  return await client.fetch(getProductBySearchQuery, {
    search: searchTerm ? `*${searchTerm}*` : '*'
  })
}
export const getProductsByFilter1 = async ({
  searchTerm,
  categoryTerm,
  sizes,
  brands,
  minPrice,
  maxPrice
}: {
        searchTerm?: string | null,
        categoryTerm?: string | null,
        sizes?: string[] | null,
        brands?: string[] | null,
        minPrice?: number | null,
    maxPrice?:number | null
    }) => {
 console.log({searchTerm,categoryTerm,sizes,brands,minPrice,maxPrice})
    return await client.fetch(getProductsByFilterQuery1, {
      searchTerm: searchTerm ? `*${searchTerm}*` : '*',
      categoryTerm,
      sizes,
      brands,
      minPrice,
      maxPrice
    })
}
export const getProductsByCategory = async (category: string) => {
  return await client.fetch(getProductsByCategoryQuery, { category })
}
export const getCategories = async () => {
  return await client.fetch(getCategoryQuery)
}
