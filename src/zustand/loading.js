import { create } from 'zustand'

const loading = create(set => ({
  isLoading: false,
  setIsLoading: (payload) => { set({ isLoading: payload }) },
}))

export default loading
