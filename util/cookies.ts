import Cookies from 'js-cookie'
import { StateStorage } from 'zustand/middleware'

export const stateStoragePersist: StateStorage = {
  getItem: async (key: string): Promise<any> => {
    // console.log(key, 'has been retrieved')
    return Cookies.get(key) || null
  },
  setItem: async (key: string, value: string): Promise<void> => {
    // console.log(key, 'with value', value, 'has been saved')
    Cookies.set(key, value)
  },
  removeItem: async (key: string): Promise<void> => {
    // console.log(key, 'has been deleted')
    Cookies.remove(key)
  },
}