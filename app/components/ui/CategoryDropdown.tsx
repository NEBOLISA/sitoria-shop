'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Category } from '@/sanity/types'


export default function CategoryDropdown({ categories, onSelect }: {
    categories: Category[],
    onSelect: (value:string) => void
}) {
  
    return (
      <div className='md:hidden block shad-select'>
        <Select
          onValueChange={(value) => {
            onSelect(value)
          }}
        >
          <SelectTrigger className='w-27 rounded-2xl'>
            {/* <SelectValue
              className=''
              placeholder='Categories'
            /> */}
            <span className='text-white overflow-hidden inline '>Category</span>
          </SelectTrigger>

          <SelectContent className='mt-8 rounded-sm left-1/2 translate-x-1/2 '>
            {categories.map((category) => (
              <SelectItem
                key={category?._id}
                value={category?.slug?.current ?? ''}
              >
                {category?.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
}
