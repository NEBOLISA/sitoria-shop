
import { Suspense } from 'react'
import Pagination from './Pagination'
import { getTotalCount } from '@/app/lib/api/products'
import ProductSkeleton from './ProductSkeleton'
export const LIMIT = 3
const PaginationWrapper = async () => {
    
    
    const totalProducts = await getTotalCount() 
    
    const pages = Math.ceil(totalProducts / LIMIT)
 
    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)
  return (
     <Suspense
              key={JSON.stringify("pagination")}
              fallback={<ProductSkeleton />}
            >
      
              <Pagination pageNumbers={pageNumbers}  />
            </Suspense>
  )
}

export default PaginationWrapper
