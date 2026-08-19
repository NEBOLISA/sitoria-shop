import React, { useState } from 'react'

const ReviewStars = () => {
  const [rating, setRating] = useState(0)
  return (
    <div className='flex items-center gap-2'>
      {Array.from({ length: 5 }, (_, index) => {
        const starNumber = index + 1

        return (
          <svg
            key={starNumber}
            onClick={() =>
              setRating((prev) => (prev === starNumber ? 0 : starNumber))
            }
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            className={`w-5 h-5 cursor-pointer transition-all duration-200 ${
              starNumber <= rating
                ? 'fill-[#f4a300] stroke-[#f4a300]'
                : 'fill-white stroke-gray-500'
            }`}
          >
            <path d='M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l7.1-1.01L12 2z' />
          </svg>
        )
      })}
    </div>
  )
}

export default ReviewStars
