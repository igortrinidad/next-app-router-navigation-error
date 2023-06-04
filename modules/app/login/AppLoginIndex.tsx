import React, { useReducer, useState, useEffect } from 'react'
import InputWithIcon from '@/components/InputWithIcon'
import Link from 'next/link'

export default function AppLoginIndex() {

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="p-8 rounded-lg flex flex-col items-start space-y-8 shadow bg-gray-300/10 backdrop-blur-sm w-full 2xl:w-1/3 lg:w-1/2">
          <h2 className='text-xl'>Entre ou cadastre-se</h2>
          {/* <InputWithIcon placeholder='email@email.com' label='Email' /> */}

          <Link className="bg-gradient-primary" href="/app/dashboard">Continuar</Link>
          <Link className="bg-gradient-primary" href="/app/login/confirm">Confirm</Link>
        </div>
      </div>
    </>
  )
}
