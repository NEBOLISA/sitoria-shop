// lib/api/products.ts

import { client } from "@/sanity/lib/client";
import { bestSellersQuery, getCategoryQuery, getProductByIdQuery, getProductBySearchQuery, getProductsByCategoryQuery, getProductsByPageQuery,  getTotal } from "@/sanity/lib/queries";




export async function getProducts(page: number, limit: number) {
  const start = (page - 1) * limit;
  const end = start + limit;
  
  return  await client.fetch(getProductsByPageQuery, { start, end });
}

export async function getProductById(id: string | null) {
    return await client.fetch(getProductByIdQuery, { id });
}
 export async function getBestSellers() {
    return await client.fetch(bestSellersQuery);
}

export async function getTotalCount() {
    return await client.fetch<number>(getTotal);
}

export const getProductsBySearch = async (searchTerm: string) => {
    return await client.fetch(getProductBySearchQuery, { search: searchTerm ? `*${searchTerm}*`:"*" });
}

export const getProductsByCategory = async (category: string) => {
    return await client.fetch(getProductsByCategoryQuery, { category });
}
export const getCategories = async () => {
    return await client.fetch(getCategoryQuery);
}