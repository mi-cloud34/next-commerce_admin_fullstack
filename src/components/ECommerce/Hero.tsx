import React from 'react'

const Hero = () => {
  return (
    <div className=' mt-4'>
        <div className='container grid md:grid-cols-2 py-8'>
            <div className='flex items-center'>
                <div className='max-w-[450px] space-y-4'>
                    <p className='text-topHeadingPrimary'>
                        Starting at <span className='font-bold'>$999.00</span>
                    </p>
                    <h1 className='text-topHeadingPrimary font-bold text-4xl md:text-5xl'>
                        The best book collection 2023
                    </h1>
                    <h3 className="text-2xl font-['Oregano',cursive]">
                        Exlusive offer <span className='text-red-600'>-10%</span>this week
                    </h3>
                    <a 
                    className='inline-block bg-white rounded-md px-6 py-3 hover:bg-accent'
                    href="#">Shop Showw</a>
                </div>
            </div>
            <div>
                <img className='ml-auto' src="/hero.jpg" alt="hero" />
            </div>
        </div>
    </div>
  )
}

export default Hero