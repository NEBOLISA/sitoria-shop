
import Pagination from './Pagination'
import { getTotalCount } from '@/app/lib/api/products'
export const LIMIT = 3
const PaginationWrapper = async () => {
    
    
    const totalProducts = await getTotalCount() 
    
    const pages = Math.ceil(totalProducts / LIMIT)
 
    const pageNumbers = Array.from({ length: pages }, (_, i) => i + 1)
  return (
    <Pagination pageNumbers={pageNumbers}  />
  )
}

export default PaginationWrapper
