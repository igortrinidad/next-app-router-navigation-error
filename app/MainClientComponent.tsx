'use client';
 
import { useEffect } from 'react';
import { useGeneralStore } from '@/modules/general/store'

export default function MainClientComponent() {
  
  
  const toggleDarkMode = useGeneralStore((state: any) => state.toggleDarkMode)
  
  const eventListenerAltArrowDown = (e: any) => {
    if(e.altKey && e.key === 'ArrowUp') {
      toggleDarkMode()
    }
  }
  
  useEffect(() => {
    document.addEventListener('keydown', eventListenerAltArrowDown)

    return () => {
      document.removeEventListener('keydown', eventListenerAltArrowDown)
    }
  }, [])

 
  return (<></>);
}