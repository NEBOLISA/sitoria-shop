import {motion,AnimatePresence } from "framer-motion"
import ReviewStars from "./ReviewStars"


const ReviewDropDown = ({ open }:{open: boolean }) => {
    const stars = Array.from({ length: 4 }, (_, index) => index)
    const reviews = Array.from({ length: 12 }, (_, index) => index)
    return (
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className=''
          >
            <div
              className={`${
                reviews?.length > 0 ? ' h-75' : 'h-30'
              } overflow-scroll   max-w-3xl  bg-gray-50  p-8 rounded-lg mt-3`}
            >
              {reviews.length > 0 ? (
                reviews.map((review, index) => (
                  <div
                    key={index}
                    className='w-full pb-2   flex items-start gap-5 border-b border-gray-300 mb-4'
                  >
                    <div className='w-10 h-10 rounded-full bg-[#d9d9d9] flex items-center justify-center shrink-0'>
                      <span className='text-md font-semibold text-[#1f2b1f]'>
                        PK
                      </span>
                    </div>

                    <div className='flex-1'>
                      <div className='flex items-center gap-4'>
                        <h3 className='text-sm font-semibold text-[#1f2b1f]'>
                          Priya K.
                        </h3>

                        <span className='text-[18px] text-gray-600'>•</span>

                        <p className='text-sm text-gray-600'>9 May 2026</p>
                      </div>

                      <div className='flex items-center gap-1 mt-1'>
                        {stars.map((star, index) => (
                          <svg
                            key={index}
                            xmlns='http://www.w3.org/2000/svg'
                            className='w-3 h-3 fill-[#f4a300]'
                            viewBox='0 0 24 24'
                          >
                            <path d='M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l7.1-1.01L12 2z' />
                          </svg>
                        ))}
                      </div>

                      <p className='mt-2 text-sm leading-relaxed text-[#4b4b4b] font-medium'>
                        Pretty good! Not the absolute best I had, but definitely
                        worth the price.
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className='w-full items-center justify-center h-full flex text-gray-500  text-md font-bold'>
                  No Reviews on this product yet
                </div>
              )}
             
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
}

export default ReviewDropDown
