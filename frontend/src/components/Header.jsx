import React from 'react'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row flex-wrap bg-[var(--accent)] rounded-2xl px-6 md:px-10 lg:px-16 overflow-hidden border border-[var(--border)]'>

       {/* ---------Left--------------- */}
       <div className='md:w-1/2 flex flex-col items-start justify-center gap-5 py-12 m-auto md:py-[8vw] md:mb-[-20px]'>
        <p className='text-3xl md:text-4xl lg:text-5xl text-[var(--color-canvas-white)] font-semibold leading-tight md:leading-tight lg:leading-tight tracking-tight'>
            Book Appointments <br />With Doctors
        </p>
        <div className='flex flex-col md:flex-row items-center gap-4 text-[var(--color-canvas-white)]/80 text-sm'>
            <img className='w-28 rounded-full border-2 border-[var(--border-subtle)]' src={assets.group_profiles} alt="Doctors" />
            <p className='leading-relaxed'>Browse doctor profiles and<br className='hidden sm:block' /> book appointments online.</p>
        </div>
        <a href="#speciality" className='flex items-center gap-2 bg-[var(--color-canvas-white)] px-8 py-3.5 rounded-full text-[var(--ink)] text-sm font-medium mt-2 hover:bg-[var(--surface)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-canvas-white)]/50'>
            Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
        </a>
       </div>

       {/* ---------Right--------------- */}
       <div className='md:w-1/2 relative flex items-end'>
        <img className='w-full h-auto object-cover rounded-b-2xl md:rounded-none' src={assets.header_img} alt="Doctor" />
       </div>

    </div>
  )
}

export default Header
