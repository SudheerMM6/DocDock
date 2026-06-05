import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const Banner = () => {

    const navigate = useNavigate()

  return (
    <div className='flex bg-[var(--accent)] rounded-2xl px-6 sm:px-10 md:px-14 lg:px-12 my-20 md:mx-10 border border-[var(--border)]'>
        {/* ---------Left------------- */}
        <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pl-5 '>
            <div className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-semibold text-[var(--color-canvas-white)]'>
                <p>Book Appointment</p>
                <p className='mt-4'>With 50+ Trusted Doctors</p>
            </div>
            <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-[var(--color-canvas-white)] text-sm sm:text-base text-[var(--ink)] px-8 py-3 rounded-full mt-6 hover:bg-[var(--surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-canvas-white)]/50 font-medium'>Create Account</button>
        </div>

        {/* ---------Right---------- */}
        <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
            <img className='w-full absolute bottom-0 right-0 max-w-md' src={assets.appointment_img} alt="" />
        </div>
    </div>
  )
}

export default Banner