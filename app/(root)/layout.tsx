import Image from 'next/image'
import Link from 'next/link'
import React, { ReactNode } from 'react'

function Rootlayout({children}:{children:ReactNode}) {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className='flex items-center gap-2'/>
        <Image src="/logo.svg" alt="Logo" width={38} height={32}/>

        <h2 className='text-primary-100'> Prepwise</h2>
      </nav>
      {children}
    </div>
  )
}

export default Rootlayout
