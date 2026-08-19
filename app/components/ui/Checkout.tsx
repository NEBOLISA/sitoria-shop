import React from 'react'

const Checkout = () => {
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        state: '',
        city: '',
        receiver: 'Myself'
    })
    const receiverOptions = ['Myself', 'Someone else', 'Branch/Office Pickup']
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({ ...prev, [name]: value }))
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log({formData})
        // Handle form submission logic here
    }
  return (
    <>
      <form className='flex-1 overflow-y-auto p-8 px-4 '>
        {/* Select */}
        <div className='mb-6'>
          <label className='block text-sm  text-gray-700 mb-2'>
            Who will receive this item?
          </label>
          <div className='relative'>
            <select name='receiver' value={formData?.receiver || ""} onChange={handleSelectChange} className='w-full cursor-pointer border border-gray-300 rounded-md px-6 py-3 font-medium text-gray-800 appearance-none outline-none focus:ring-[0.5px] focus:ring-gray-300'>
              {receiverOptions.map((option) => (
                <option   key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            {/* Arrow */}
            <div className='absolute inset-y-0 right-6 flex items-center pointer-events-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='w-3 h-3 text-gray-600'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 9l-7 7-7-7'
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Details */}
        <h2 className='text-md  text-gray-700 mb-6'>Your Details</h2>

        {/* Names */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-8'>
          <div>
            <label className='block text-sm text-gray-700 mb-1'>
              First name
            </label>

            <input
              type='text'
              className='w-full h-12 border border-gray-300 rounded-md px-5  outline-none focus:ring-[0.5px] focus:ring-gray-300'
            />
          </div>

          <div>
            <label className='block text-sm text-gray-700 mb-1'>
              Last name
            </label>

            <input
              type='text'
              className='w-full h-12 border border-gray-300 rounded-md px-5  outline-none focus:ring-[0.5px] focus:ring-gray-300'
            />
          </div>
        </div>

        {/* Phone */}
        <div className='mb-8'>
          <label className='block text-sm text-gray-700 mb-1'>
            Phone number
          </label>

          <input
            type='tel'
            className='w-full h-12 border border-gray-300 rounded-md px-5  outline-none focus:ring-[0.5px] focus:ring-gray-300'
          />
        </div>

        {/* Email */}
        <div className='mb-8'>
          <label className='block text-sm text-gray-700 mb-1'>Email</label>

          <input
            type='email'
            className='w-full h-12 border border-gray-300 rounded-md px-5  outline-none focus:ring-[0.5px] focus:ring-gray-300'
          />
        </div>
        <div className='mb-3'>
          <label className='block text-sm text-gray-700 mb-1'>
            Delivery Address
          </label>

          <textarea
            rows={9}
            className='w-full h-24 border border-gray-300 rounded-md px-5  outline-none focus:ring-[0.5px] focus:ring-gray-300'
          />
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3 mb-8'>
          <div className='relative'>
            <label className='block text-sm text-black mb-1'>State</label>
            <div className='relative'>
              <select className='w-full cursor-pointer border border-gray-300 rounded-md px-6 py-3 pr-3 font-medium text-gray-800 appearance-none outline-none focus:ring-[0.5px] focus:ring-gray-300'>
                <option>Select Option</option>
              </select>

              {/* Arrow */}
              <div className='absolute right-3  top-1/2 -translate-y-1/2 pointer-events-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-3 h-3 text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className='relative'>
            <label className='block text-sm text-black mb-1'>City</label>
            <div className='relative'>
              <select className='w-full  cursor-pointer border border-gray-300 rounded-md px-6 py-3 pr-3 font-medium text-gray-800 appearance-none outline-none focus:ring-[0.5px] focus:ring-gray-300'>
                <option>Select Option</option>
              </select>

              {/* Arrow */}
              <div className='absolute right-3  top-1/2 -translate-y-1/2 pointer-events-none'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='w-3 h-3 text-gray-600'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M19 9l-7 7-7-7'
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
          </form>
          
      <div className='p-4  border-t  w-full '>
        <div className=' w-full    '>
                  <button
                      onClick={handleSubmit}
            // onClick={() => setView(1)}
            className='w-full cursor-pointer bg-green-500 text-white py-1.5 rounded-full font-light flex items-center justify-center gap-2'
          >
          Checkout
          </button>
        </div>
      </div>
    </>
  )
}

export default Checkout
