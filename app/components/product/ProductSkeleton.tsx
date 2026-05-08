// app/components/ProductsSkeleton.tsx

export default function ProductSkeleton() {
  return (
    <div className='px-4 py-8 mt-9'>
      {/* heading skeleton */}
      <div className='h-8 w-48 bg-gray-200 rounded animate-pulse mb-8' />

      {/* product grid */}
      <div className='grid grid-cols-2 md:grid-cols-3  gap-6'>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className='border rounded-lg p-3 space-y-3'>
            {/* image */}
            <div className='aspect-square bg-gray-200 rounded animate-pulse' />

            {/* title */}
            <div className='h-4 bg-gray-200 rounded animate-pulse' />

            {/* price */}
            <div className='h-4 w-20 bg-gray-200 rounded animate-pulse' />
          </div>
        ))}
      </div>
    </div>
  )
}
