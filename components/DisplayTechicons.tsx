import { cn, getTechLogos } from '@/lib/utils'
import Image from 'next/image'
import React from 'react'

type DisplayTechiconsProps = {
  techStack: string[];
};

const DisplayTechicons = async ({ techStack }: DisplayTechiconsProps) => {
    const techIcons = await getTechLogos(techStack)
  return (
    <div className='flex flex-row'>
      {techIcons.slice(0,3).map(({tech, url}, index) => (
        <div key={tech} className={cn('relative group bg-dark-300 rounded-full p-2 flex-center', index > 1 && '-ml-3')}>
            <span className='tech-tooltip'>{tech}</span>
            <Image src={url} alt={tech} width={20} height={20} className='size-5'/>
        </div>
      ))}
    </div>
  )
}

export default DisplayTechicons
