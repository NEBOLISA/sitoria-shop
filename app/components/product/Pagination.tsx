"use client"

import { ChevronLeft,ChevronRight } from 'lucide-react'
import Link from "next/link";
import { useRouter, useSearchParams, } from "next/navigation";

interface PaginationProps {
    pageNumbers: number[];
   
}

const Pagination = ({ pageNumbers }: PaginationProps) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    const currentPage = Number(searchParams.get("page")) || 1;
    
    const DOTS = "..."
    const firstPage = 1
    const lastPage = pageNumbers.length
    const siblingsCount = 1
    const totalPageNumbers = siblingsCount + 5
    let paginationRange: (number | string)[] = []
    if (pageNumbers.length <= totalPageNumbers) {
        paginationRange = pageNumbers
    } else {
        const leftSiblingIndex = Math.max(currentPage - siblingsCount, firstPage)
        const rightSiblingIndex = Math.min(currentPage + siblingsCount, lastPage)
        const shouldShowLeftDots = leftSiblingIndex > firstPage + 2
        const shouldShowRightDots = rightSiblingIndex < lastPage - 2

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingsCount
            const leftRange = pageNumbers.slice(0, leftItemCount)
            paginationRange = [...leftRange, DOTS, pageNumbers.length]
        } else if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingsCount
            const rightRange = pageNumbers.slice(pageNumbers.length - rightItemCount)
            paginationRange = [firstPage, DOTS, ...rightRange]
        } else if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = pageNumbers.slice(leftSiblingIndex - 1, rightSiblingIndex)
            paginationRange = [firstPage, DOTS, ...middleRange, DOTS, lastPage]
        }
    }
   const nextPage = () => {
    if (currentPage < pageNumbers.length) {
      router.push(`?page=${currentPage + 1}`, { scroll: false });
    }
  };

 
  const prevPage = () => {
    if (currentPage > 1) {
      router.push(`?page=${currentPage - 1}`, { scroll: false });
    }
  };
   
    if (currentPage === 0 || paginationRange.length < 2) {
        return null;
    }
  return (
    <div>
         
          <div className='flex items-center justify-center gap-4 mt-8 mb-8'>
              <button className={`${currentPage === firstPage ? "hover:bg-white ":"hover:bg-gray-100"} bg-white hover:bg-gray-100 cursor-pointer px-2 py-1  rounded-md transition-colors border border-gray-300 duration-200`} onClick={prevPage} disabled={currentPage === firstPage}>
                  <ChevronLeft  className={  `${currentPage === firstPage ? 'text-gray-400 ' : 'text-black'} w-5 h-6 `}  />
              </button>
              {paginationRange?.map((number) => 
              {
                  if (number === 1) {
                      return (
                          <Link href="/" key={number} scroll={false}>
                              <button className={`${currentPage == number ? "bg-green-600 text-white":" bg-white hover:bg-gray-100 text-black"} cursor-pointer px-3 py-1 rounded-md transition-colors duration-200`}>
                                  {number}
                              </button>
                          </Link>
                      )
                  } else {
                      
                      return(
                    <Link href = {`?page=${number}`} key = { number } scroll = { false} >
                      
                <button disabled={number == DOTS}  key={number} className={`${number == DOTS && "hover:bg-transparent"} ${currentPage == number ? "bg-green-600 text-white":" bg-white hover:bg-gray-100 text-black"} cursor-pointer px-3 py-1 rounded-md transition-colors duration-200`}>
                    {number}
                </button>
                </Link>)}
                  }
            )}
               <button onClick={nextPage} className={`${currentPage === lastPage ? "hover:bg-white ":"hover:bg-gray-100"} bg-white hover:bg-gray-100 cursor-pointer px-2 py-1  rounded-md transition-colors border border-gray-300 duration-200`}> <ChevronRight  className={  `${currentPage === lastPage ? 'text-gray-400' : 'text-black'} w-5 h-6 `}  /></button>
        </div>

          
    </div>
  )
}

export default Pagination
