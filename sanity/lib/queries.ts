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