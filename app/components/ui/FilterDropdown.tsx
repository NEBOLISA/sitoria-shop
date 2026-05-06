'use client'

import { useEffect, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { SlidersHorizontal, ArrowLeft } from 'lucide-react'
import PriceSlider from './PriceSlider'

import { Brand } from '@/sanity/types'

import { useSearchParams, useRouter } from 'next/navigation'
import { useFilterStore } from '@/app/store/useFilterStore'

type ViewProp = {key:string,param:string}
interface FilterDropdownProps {
  maxmin: { maxPrice: number; minPrice: number }
  brands: Brand[]
  isNotMainPage: boolean
}
export default function FilterDropdown({
  brands,
  maxmin,
  isNotMainPage
}: FilterDropdownProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  //const [price, setPrice] = useState([maxmin?.minPrice, maxmin?.maxPrice])
  const minimumPrice = maxmin?.minPrice
  const maximumPrice = maxmin?.maxPrice
  const [view, setView] = useState({ key: 'main', param: 'main' })
  const Views: ViewProp[] = [
    { key: 'size', param: 'sizes' },
    { key: 'brand', param: 'brands' },
    { key: 'price', param: 'prices' }
    //{ key: 'main', param: 'main' }
  ]
  const sizes = ['S', 'M', 'L', 'XL']

  // const brands = ['Nike', 'Adidas', 'Puma']
  interface SelectedFilterProps {
    brands: string[]
    prices: number[]
    sizes: string[]
  }
  //   const [selectedFilters, setSelectedFilters] = useState<SelectedFilterProps>({
  //         brands: [] ,
  //         prices: [],
  //         sizes: []
  //   })
  const { selectedFilters, setSizes, setBrands, setPrices } = useFilterStore()
  const prices = useFilterStore((state) => state.selectedFilters.prices)
  // useEffect(() => {
  //     const params = new URLSearchParams(searchParams)
  //     const sizes = selectedFilters.sizes
  //     const prices = selectedFilters.prices
  //     const brands = selectedFilters.brands
  //     if (sizes.length === 0 && prices.length === 0 && brands.length === 0) {
  //         router.push(`/`)
  //         return
  //     }
  //     params.set('size', sizes.join(','))
  //     params.set('brand', brands.join(','))
  //     params.set('price', prices.join('-'))
  //     router.push(`/?${params.toString()}`)

  // },[selectedFilters])

  const handleSelectedSize = (value: boolean | string, size: string) => {
    const newSize = value
      ? [...selectedFilters.sizes, size]
      : selectedFilters.sizes.filter((item) => item !== size)
    setSizes(newSize)
    if (newSize.length) {
      params.set('size', newSize.join(','))
    } else {
      params.delete('size')
    }
    router.push(`/?${params.toString()}`)
  }
  const handleSelectedBrand = (value: boolean | string, brand: string) => {
    const newBrand = value
      ? [...selectedFilters.brands, brand]
      : selectedFilters.brands.filter((item) => item !== brand)
    setBrands(newBrand)
    if (newBrand.length) {
      params.set('brand', newBrand.join(','))
    } else {
      params.delete('brand')
    }
    router.push(`/?${params.toString()}`)
  }
  const handleSelectedPrice = (selectedprices: number[]) => {
    setPrices(selectedprices)
    if (selectedprices.length) {
      params.set('price', selectedprices.join('-'))
    } else {
      params.delete('price')
    }
    router.push(`/?${params.toString()}`)
  }
  // const handleClearFilter = (view:ViewProp) => {
  //     if (view.param === 'prices') {
  //         setPrice([Number(minimumPrice), Number(maximumPrice)])
  //         setSelectedFilters((prev) => ({
  //           ...prev,
  //           prices: []
  //         }))
  //         return
  //     }
  //        setSelectedFilters((prev) => ({
  //          ...prev,
  //          [view.param]:[]
  //        }))

  // }
  const handleClearFilter = (type: ViewProp) => {
    //   const params = getParams()

    if (type.key === 'size') {
      setSizes([])
      params.delete('size')
    }

    if (type.key === 'brand') {
      setBrands([])
      params.delete('brand')
    }

    if (type.key === 'price') {
      setPrices([0,0])
      params.delete('price')
    }

    router.push(`/?${params.toString()}`)
  }
  return (
    <div className={`absolute ${isNotMainPage ? "md:top-118 sm:top-99 top-96":"md:top-144 top-93"}  right-8`}>
      <Popover>
        {/*  Trigger */}
        <PopoverTrigger asChild>
          <Button
            variant='outline'
            size='icon'
            className='w-max flex gap-3 cursor-pointer px-3'
          >
            <span className='font-bold'>Filter</span>
            <SlidersHorizontal className='w-5 h-5' />
          </Button>
        </PopoverTrigger>

        {/* Content */}
        <PopoverContent className='w-52 justify-center'>
          {/* 🔙 Back Button */}
          {view.key !== 'main' && (
            <>
              <button
                onClick={() => setView({ key: 'main', param: 'main' })}
                className='flex  items-center gap-2 mb-3 text-sm text-black'
              >
                <ArrowLeft className='w-5 h-5 cursor-pointer text-black' />
                <span className='font-bold ml-6 text-md capitalize'>
                  {view.key}
                </span>
              </button>
            </>
          )}

          {/*  MAIN MENU */}
          {view.key === 'main' && (
            <h3 className='font-semibold text-lg mb-2'>Filter by</h3>
          )}
          {view.key === 'main' &&
            Views.map((v: ViewProp) => (
              <div
                className='-mt-2 border-t justify-center hover:bg-gray-50 pl-1 transition-all duration-500 ease-in-out '
                key={v.key}
              >
                <button
                  onClick={() => setView(v)}
                  className='block w-full  text-left capitalize py-2 cursor-pointer'
                >
                  {v.key}
                </button>
              </div>
            ))}

          {/* SIZE */}
          {view.key === 'size' && (
            <div className='space-y-2'>
              {sizes.map((size, index) => (
                <label
                  key={size}
                  htmlFor={size + index}
                  className='cursor-pointer py-2 mb-0 flex items-center gap-2 border-b '
                >
                  <Checkbox
                    id={size + index}
                    checked={selectedFilters.sizes.includes(size)}
                    onCheckedChange={(value) => {
                      handleSelectedSize(value, size)
                    }}
                    className='cursor-pointer'
                  />
                  {size}
                </label>
              ))}
            </div>
          )}

          {/* BRAND */}
          {view.key === 'brand' && (
            <div className='space-y-2'>
              {brands?.map((b) => (
                <label
                  key={b?._id}
                  htmlFor={b?._id}
                  className='cursor-pointer py-2 mb-0 flex items-center gap-2 border-b '
                >
                  <Checkbox
                    id={b?._id}
                    className='cursor-pointer'
                    checked={selectedFilters.brands.includes(b?.name ?? '')}
                    onCheckedChange={(value) => {
                      handleSelectedBrand(value, b?.name ?? '')
                    }}
                  />
                  {b?.name}
                </label>
              ))}
            </div>
          )}

          {/* PRICE */}
          {view.key === 'price' && (
            <div className='space-y-2'>
              <PriceSlider
                price={prices}
                handlePrice={handleSelectedPrice}
                MAX={maximumPrice}
                MIN={minimumPrice}
              />
            </div>
          )}
          {view.key !== 'main' && (
            <div className='w-full my-2 flex items-center justify-center'>
              <button
                onClick={() => handleClearFilter(view)}
                className='px-3 py-1 text-white font-bold hover:bg-green-500 transition-al duration-300 ease-in-out hover:scale-105 bg-green-600 cursor-pointer'
              >
                Clear
              </button>
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
