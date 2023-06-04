import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { stateStoragePersist } from '@/util/cookies'

export interface GeneralStoreInterface {
  darkMode: boolean
  toggleDarkMode: () => void
}

export const useGeneralStore = create(persist(
  (set) => ({
    darkMode: true,
    toggleDarkMode: () => set((state: GeneralStoreInterface) => {
      
      document.documentElement.classList.toggle('dark', !state.darkMode)
      document.documentElement.classList.toggle('light', state.darkMode)

      return { darkMode: !state.darkMode }
    
    })
  }),
  {
    name: 'general-store',
    storage: createJSONStorage(() => stateStoragePersist),
  }
))