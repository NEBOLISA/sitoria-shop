'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
     
      if (!query.trim()) {
         router.push('/')
          return
      }
    
    router.push(`/?search=${encodeURIComponent(query)}`)
  }

  return (
 
      <form
        onSubmit={handleSearch}
        className='relative w-full max-w-md mx-auto mt-14'
      >
        {/* Input */}
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search perfumes here...'
          className='w-full  bg-white rounded-md py-3 pl-4 pr-12 text-gray-700 outline-none shadow-sm border border-gray-200 focus:border-green-500'
        />

        {/* Search Button */}
        <div className='absolute right-2 top-1/2 -translate-y-1/2'>
          <button className='bg-green-500 hover:bg-green-600 text-white p-2 rounded-full flex items-center justify-center'>
            <Search size={18} />
          </button>
        </div>
      </form>

  )
}
