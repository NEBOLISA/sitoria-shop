"use client"
import { useCartStore } from '@/app/store/cartStore'
import { ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import CartDrawer from '../ui/CartDrawer'
import { getCategories, getProductsByCategory } from '@/app/lib/api/products'
import { Category } from '@/sanity/types'
import { useRouter } from 'next/navigation'

const Navbar = () => {
   const router = useRouter()
  const { cart} = useCartStore()
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [categories, setCategories] = useState<Category[]>([])
  const quantity = useCartStore((state) => state.cart.length);
  useEffect(() => {
    getCategories().then((data: Category[]) => {
      console.log({data})
      setCategories(data)
   
    })
   }, [])
  
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 30);
        };
    
        window.addEventListener("scroll", handleScroll);
  
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    return (
        <nav className={`transition-colors duration-300 ease-in-out fixed z-40 top-0  w-full max-w-300 mx-auto  px-4 flex items-center justify-between py-4 bg-black ${scrolled ? "bg-black text-white " : "bg-transparent  text-white"
            }`}>
            
          <Link className='font-bold text-2xl cursor-pointer text-white' href="/">
            PerfShop
          </Link>
          <ul className='hidden md:flex gap-6 lg:gap-8 xl:gap-10 font-avenir font-medium items-center'>
          {categories?.map((category) => (
            <li key={category._id} onClick={()=>{router.push(`/${category?.slug?.current}`)}} className='cursor-pointer'>
            <div className='
                    transition-all duration-200 hover:opacity-70 whitespace-nowrap text-white
                  ' >
              {category?.title}
            </div>
          </li>
         ))
         }
              {/* <li><Link className='
                    transition-all duration-200 hover:opacity-70 whitespace-nowrap text-white
                  ' href="/categories/women">Women</Link></li>
              <li><Link className='
                    transition-all duration-200 hover:opacity-70 whitespace-nowrap text-white
                  ' href="/categories/unisex">Unisex</Link></li> */}
          </ul>
          <button className='w-9 cursor-pointer h-9 rounded-full flex items-center justify-center bg-green-700 relative' onClick={() => setIsOpen(true)}>
          <div className='absolute w-4 h-4 flex rounded-full justify-center items-center -top-1 -right-2 bg-white text-[12px] text-black'>{quantity}</div>
              <ShoppingCart className='text-white' size={18}   />
        </button>
        {isOpen && (<CartDrawer isOpen={isOpen} onClose={() => setIsOpen(false)} cart={cart} />)}
    </nav>
  )
}

export default Navbar
