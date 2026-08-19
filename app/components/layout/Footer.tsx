import React from 'react'
import { Playfair_Display, Outfit } from 'next/font/google'
import { FaPhoneAlt } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'
import { MdOutlineEmail } from 'react-icons/md'

const outfit = Outfit({ subsets: ['latin'], weight: '600' })
const Footer = () => {
  return (
    <footer className='bg-black text-white py-5 px-8 mt-12'>
      <div className='grid md:grid-cols-[2fr_1.3fr] grid-cols-1 gap-8'>
        <section className=' flex flex-col  '>
          <h3 className={outfit.className + 'text-xl font-semibold mb-4'}>
            {' '}
            Sitoria
          </h3>
          <p className='text-sm text-white/70 mb-4 w-[80%]'>
            Bringing elegant, long-lasting fragrances from carefully selected
            perfume collections straight to your doorstep. Elevate your presence
            with scents that define sophistication, confidence, and style.
          </p>
          <div className='space-y-2 text-white mt-4'>
            <h1 className='text-sm font-semibold uppercase mb-2 '>Contact us</h1>
            <p className='flex gap-3 text-sm text-white/70'>
              <FaPhoneAlt color='white' />
              <RiWhatsappFill color='white' size={15} />
              08130244391
            </p>
            <p className='flex gap-3 text-sm text-white/70'>
              <MdOutlineEmail color='white' />
              chidumenneamaka@gmail.com
            </p>
          </div>
        </section>
        <section className=''>
          <form action='' className='flex flex-col space-y-2'>
            <h2 className='text-sm font-bold uppercase'>
              Sign Up for discounts and updates
                      </h2>
                      <input className='px-4 py-3 outline-0 rounded-md bg-gray-500 placeholder:text-white/70' type="text" name="" id="" placeholder='Enter your phone number or email address' />
                      <button className='py-2 mt-3 px-6 cursor-pointer rounded-sm text-white font-bold text-md bg-green-800 w-max'>Subscribe</button>
          </form>
        </section>
      </div>
    </footer>
  )
}

export default Footer
