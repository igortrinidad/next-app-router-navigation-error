
import React, { useEffect } from 'react'
import { useGeneralStore } from '@/modules/general/store'

export default function LayoutAppIndex ({ children }: any ) {

  const darkMode = useGeneralStore((state: any) => state.darkMode)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    document.documentElement.classList.toggle('light', !darkMode)

    alert('asd')
  }, [darkMode])

  return (
    <>
    <div className="flex w-screen h-auto min-h-[100vh] max-h-none max-w-[1040px] p-2 lg:p-4 pb-32 bg-red-100">
      <div className="w-full flex">
        { children }
      </div>
    </div>
    </>
  )
}
