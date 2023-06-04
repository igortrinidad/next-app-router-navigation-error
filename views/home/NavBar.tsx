'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from "react"
import Dropdown from '../../components/Dropdown'
import { Icon } from '@iconify/react';
import { useBearStore, BearStoreInterface } from '../../stores/bears'
export default function NavBar(props: { onClick: (page: number) => void }) {

  const router = useRouter()
  const bears = useBearStore((state: any) => state.bears)
  const increasePopulation = useBearStore((state: any) => state.increasePopulation)
  
  const handleClick = (page: number) => {
    props.onClick(page)
  }

  useEffect(() => {
    return () => {
      console.log('unmounting')
    }
  }, [])

  return (
    <div className="w-full p-10 block font-bold flex justify-between pointer-events-auto z-10">
      <button onClick={() => handleClick(0)} className="flex space-x-2 items-center">
        <Image src="/mkt/icon.png" width="48" height="48" alt="IT Development Logo" />
        <h1 className="hidden md:block text-2xl uppercase" onClick={ increasePopulation }>Development { bears }</h1>
      </button>

      <div className="flex space-x-4 items-center">

        <Dropdown closeOnClick={ true } trigger={
          <div className="flex items-center space-x-1">
            <span>{ router.locale }</span>
            <Icon className="text-amber-500" icon="material-symbols:keyboard-arrow-down-rounded" />
          </div>
        }>
          <ul>
            <li>
              <Link href={router.asPath} locale="pt">
                PT-BR
              </Link>
            </li>
            <li>
              <Link href={router.asPath} locale="en">
                EN
              </Link>
            </li>
          </ul>
        </Dropdown>
        <button onClick={() => handleClick(1)} className="hidden md:block btn px-4 py-3 rounded-lg">
          Cases
        </button>
        <button onClick={() => handleClick(3)} className="btn px-4 py-3 rounded-lg border border-gray-200 hover:border-amber-500">
          Contact us
        </button>
      </div>
    </div>
  )
}