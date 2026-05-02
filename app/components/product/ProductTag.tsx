
import { Product } from '@/sanity/types'


const ProductTag = ({stockStatus, product}:{stockStatus: string, product: Product}) => {
  return (
   
                  <div className='absolute top-2 left-2 flex gap-4 z-30'>
                      < div className='flex items-center  flex-wrap gap-2'>
                          {
                              stockStatus === 'out-of-stock' && (
                                  <span className=" bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-sm">
                                      Out of Stock
                                  </span>
                              )
                              
                          }
                          {
                              stockStatus === 'low-stock' && (
                                  <span className=" bg-yellow-500 text-white text-xs font-semibold px-2 py-1 rounded-sm">
                                      Low Stock
                                  </span>
                                )
                    }
                        
                          {(product?.tags?.length ?? 0) > 0 && (
                              product?.tags?.map((tag) => (
                                  <span key={tag} className={`${tag === 'Best Seller' ? "bg-[#00bba7]" : tag === 'New Arrival' ? "bg-[#3B82F6]": tag === 'Preorder'?"bg-[#8B5CF6]": tag === "Coming Soon" ? "bg-[#6B7280]":""}  text-white text-xs font-semibold px-2 py-1 rounded-sm`}>
                                      {tag}
                                  </span>
                              ))
           
                          )
                          }
                  </div>
              </div>
    
          
             
  )
}

export default ProductTag
