// store/useUIStore.ts

import { create } from 'zustand'

interface UIStore {
  // Category/page loading
  isCategoryLoading: string | null
  setIsCategoryLoading: (category: string | null) => void

  // Mobile navbar/sidebar
  isMobileMenuOpen: boolean
  setIsMobileMenuOpen: (value: boolean) => void

  // Product quick view modal
  isProductDetailsOpen: boolean
  setIsProductDetailsOpen: (value: boolean) => void

  // Global overlay loader
  isPageTransitionLoading: boolean
  setIsPageTransitionLoading: (value: boolean) => void
}

export const useUIStore = create<UIStore>((set) => ({
  // Category loading
  isCategoryLoading: null,
  setIsCategoryLoading: (category) =>
    set({
      isCategoryLoading: category
    }),

  // Mobile menu
  isMobileMenuOpen: false,
  setIsMobileMenuOpen: (value) =>
    set({
      isMobileMenuOpen: value
    }),

  // Product details modal
  isProductDetailsOpen: false,
  setIsProductDetailsOpen: (value) =>
    set({
      isProductDetailsOpen: value
    }),

  // Global page transition loader
  isPageTransitionLoading: false,
  setIsPageTransitionLoading: (value) =>
    set({
      isPageTransitionLoading: value
    })
}))
