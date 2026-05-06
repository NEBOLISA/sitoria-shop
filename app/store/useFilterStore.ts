// store/useFilterStore.ts
import { create } from 'zustand'

interface SelectedFilterProps {
  brands: string[]
  prices: number[]
  sizes: string[]
}

interface FilterStore {
  selectedFilters: SelectedFilterProps

  setSizes: (sizes: string[]) => void
  setBrands: (brands: string[]) => void
  setPrices: (prices: number[]) => void
  clearFilters: () => void
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedFilters: {
    brands: [],
    prices: [0,0],
    sizes: []
  },

  setSizes: (sizes) =>
    set((state) => ({
      selectedFilters: { ...state.selectedFilters, sizes }
    })),

  setBrands: (brands) =>
    set((state) => ({
      selectedFilters: { ...state.selectedFilters, brands }
    })),

  setPrices: (prices) =>
    set((state) => ({
      selectedFilters: { ...state.selectedFilters, prices }
    })),

  clearFilters: () =>
    set({
      selectedFilters: { brands: [], prices: [], sizes: [] }
    })
}))