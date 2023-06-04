import Link from 'next/link'
import Head from 'next/head'
import React from 'react'

export default function Home() {

  return (
    <>
      <Head>
        <title>Capacithor App</title>
      </Head>

      <div className="w-full grid grid-cols-2 gap-4">
        <Link href="/" className="rounded p-4 flex items-center justify-center border">/</Link>
      </div>
    </>
  )
}
