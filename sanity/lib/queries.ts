import { groq } from 'next-sanity';

// export const getProductsQuery = (start: number, end: number) => `
//   *[_type == "product"] | order(_createdAt desc)[${start}...${end}]{
//     _id,
//     name,
//     price,
//     image
//   }
// `;

export const getProductBySearchQuery = groq`
 *[_type == "product" && name match $search] | order(_createdAt desc)` 
  
export const getProductsByCategoryQuery = groq`
  *[_type == "product" && $category in categories[]->slug.current] | order(_createdAt desc) 
`;
export const getCategoryQuery = groq`
  *[_type == "category"]
`;
export const getProductsByPageQuery = groq`
  *[_type == "product"] 
  | order(_createdAt desc)[$start...$end]
`;
export const getProductByIdQuery = groq`
  *[_type == "product" && _id == $id][0]
`;

export const bestSellersQuery = groq`
  *[_type == "product" && "Best Seller" in tags]
`;
export const getMaxandMinPricesQuery = groq`
{
 "minPrice": *[_type == "product"] | order(price asc)[0].price,
  "maxPrice": *[_type == "product"] | order(price desc)[0].price
}
`

export const getProductsByFilterQuery = groq`
*[
  _type == "product" && 
  (!defined($sizes) || size in $sizes) && 
  (!defined($brands) || brand->name in $brands) && 
  (!defined($minPrice) || price >= $minPrice) && 
  (!defined($maxPrice) || price <= $maxPrice)
  ] | order(_createdAt desc)
`
export const getBrandsQuery = groq`
*[_type == "brand"]
`
export const getProductsWithCountQuery = groq `{

  "products": *[_type == "product"] | order(_createdAt desc)[$start...$end]{
    _id,
    name,
    price,
    image
  },
  "total": count(*[_type == "product"])
}


`;

export const getTotal = groq`
count(*[_type == "product"])
`

// export const getProductsByFilterQuery1 = groq`
// *[
//   _type == "product" &&

//   // Search
//   (!defined($searchTerm) || name match $searchTerm) &&

//   // Category
//   (!defined($categoryTerm) || $categoryTerm in categories[]->slug.current) &&

//   // Filters
//   (!defined($sizes) || size in $sizes) && 
//   (!defined($brands) || brand->name in $brands) && 
//   (!defined($minPrice) || price >= $minPrice) && 
//   (!defined($maxPrice) || price <= $maxPrice)

// ] | order(price asc)
// `