import { motion, AnimatePresence } from 'framer-motion'
import { createPortal } from 'react-dom'
interface ConfirmDialogProps {
  promptMessage: string
  confirmText: string
  discardText: string
  action: () => void
  onClose?: () => void
}

export const ConfirmDialog = ({
  promptMessage,
  confirmText,
  discardText,
  action,
  onClose
}: ConfirmDialogProps) => {
    return createPortal(
        <AnimatePresence>

             <motion.div
     
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
     className='fixed   h-full w-full text-black inset-0 z-40 flex items-center justify-center'>
      {/* Backdrop */}
      <motion.div
        
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        //transition={{ duration: 0.25, ease: "easeOut" }}
      
        className='absolute inset-0 bg-black/50'
        onClick={() => {
          onClose?.()
        }}
      />

      {/* Modal */}
      <div className='relative mx-auto bg-white z-50 rounded-lg p-6 shadow-lg sm:w-[40%]  w-[85%] text-center'>
        <p className='text-md '>{promptMessage}</p>
        {/* <p className='text-sm text-gray-500 mt-1'>
          This action cannot be undone
        </p> */}

        <div className='flex justify-center gap-3 mt-8'>
          <button
            className='px-4 cursor-pointer hover:bg-red-400 hover:scale-105 transition-all duration-500 ease-in-out py-2 bg-red-500 text-white rounded-lg'
            onClick={() => {
              action()
              onClose?.()
            }}
          >
            {confirmText}
          </button>

          <button
            className='px-4 hover:scale-105 transition-all duration-500 ease-in-out cursor-pointer py-2 bg-transparent border border-red-600 text-red-500 rounded-lg'
            onClick={() => {
              onClose?.()
            }}
          >
            {discardText}
          </button>
        </div>
      </div>
    </motion.div>
        </AnimatePresence>,document.body
  )
}
