import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      scrollToBestSellers: () => {
        const el = document.getElementById('best-sellers')
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' })
        }
      },
      // Add to cart
      addToCart: (product) => {
        const existing = get().cart.find((item) => item._id === product._id)

        if (existing) {
          // increase quantity
          set({
            cart: get().cart.map((item) =>
              item._id === product._id
                ? {
                    ...item,
                    quantity: item.quantity + 1,
                    calculatedPrice: item.price * (item.quantity + 1)
                  }
                : item
            )
          })
        } else {
          set({
            cart: [
              ...get().cart,
              { ...product, quantity: 1, calculatedPrice: product.price }
            ]
          })
        }
      },

      //  Remove item completely
      removeFromCart: (id) => {
        set({
          cart: get().cart.filter((item) => item._id !== id)
        })
      },

      // ➕ Increase quantity
      increaseQty: (id) => {
        set({
          cart: get().cart.map((item) =>
            item._id === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  calculatedPrice: item.price * (item.quantity + 1)
                }
              : item
          )
        })
      },

      // ➖ Decrease quantity
      decreaseQty: (id) => {
        set({
          cart: get()
            .cart.map((item) =>
              item._id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    calculatedPrice: item.price * (item.quantity - 1)
                  }
                : item
            )
            .filter((item) => item.quantity > 0)
        })
      },

      // 🧹 Clear cart
      clearCart: () => set({ cart: [] }),

      // 💰 Total price
      getTotalPrice: () => {
        return get().cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      }
    }),
    {
      name: 'cart-storage' // localStorage key
    }
  )
)
