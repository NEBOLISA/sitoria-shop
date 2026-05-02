import { getStockStatus } from '@/app/lib/utils/stock'
import { urlFor } from '@/sanity/lib/image'
import {  Product } from '@/sanity/types'
import Image from 'next/image'
import ProductTag from './ProductTag'


const ProductCard = ({ product, onclick }: { product: Product; onclick: () => void }) => {
 
   const stockStatus = getStockStatus(product.stock || 0);
 
  return (
    <div className=" md:h-70 h-60   md:px-0 cursor-pointer  bg-white md:mx-0    shadow-lg rounded-lg overflow-hidden group md:w-[30%] w-[48%] border border-gray-300  relative flex flex-col items-center justify-center group " onClick={onclick}>
          {/* Best Seller Tag */}
          
      {/* Product Image */}
          <div className='flex-[0.8] w-full relative bg-gray-300/40'>
           <ProductTag stockStatus={stockStatus!} product={product} />

        <Image
          src={urlFor(product.mainImage?.asset?._ref || '').url()}
                  alt="Stylish Earbud"
              fill
             sizes="(max-width: 768px) 100vw, 200px"
          className="group-hover:scale-105 transition duration-300   object-contain"
        />
          </div>
    

      {/* Product Info */}
      <div className="p-4 flex-[0.2] w-full">
        <h2 className="font-medium text-sm truncate">{product.name}</h2>
      

        {/* Price */}
        <div className="mt-1">
          <span className="font-bold text-base">{product.price?.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}</span>
        </div>

        {/* Button */}
        {/* <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Add to Cart
        </button> */}
      </div>
    </div>
  )
}

export default ProductCard
