import InterviewCard from '@/components/InterviewCard'
import { Button } from '@/components/ui/button'
import { dummyInterviews } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
   <>
       <section className='card-cta'>
        <div className='flex flex-col gap-6 max-w-lg'>
        <h2>get interview-ready with AI-Powered Pratice & feedback</h2>
        <p className='text-lg'>
          Preatice on real Interview question & get Instant Feedback
        </p>
         
         <Button asChild className='btn-primary max-sm:w-full'>
          <Link href="/interview"> Start an interview</Link>
         </Button>
        </div>

        <Image src="/prepwise_public/public/robot.png" alt='robo-dude' width={400} height={400} className='max-sm:hidden'></Image>
       </section>

       <section className='flex flex-col gap-6 mt-8'>
        <h2>your INterview</h2>

        <div className='interviews-section'>
         {dummyInterviews.map((interview) =>(
          <InterviewCard {...interview} key={interview.id}/>
         ))}

         <p>You havent't taken any interview yet</p>
        </div>
       </section>

       <section className='flex flex-col gap-6 mt-8'>
        <h2> Take an interview</h2>

        <div className='interviews-section'>
          {dummyInterviews.map((interview) =>(
          <InterviewCard {...interview} key={interview.id}/>
         ))}
        </div>

       </section>
   </>
  )
}

export default Page
