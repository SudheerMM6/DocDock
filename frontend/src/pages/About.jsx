import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>
        
      <div className='text-center text-2xl pt-10 text-gray-500 '>
        <p>
          ABOUT <span className='text-gray-700 font-medium'>US</span>
        </p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px] ' src={assets.about_image} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600 '>
          <p>Welcome to DocDock, your trusted partner for managing healthcare appointments conveniently and efficiently. We understand the challenges patients face when scheduling doctor visits and tracking care details.</p>
          <p>DocDock is focused on delivering a smooth healthcare experience with a simple and reliable platform. Whether you are booking your first appointment or managing ongoing care, DocDock is built to support you every step of the way.</p>
          <b className='text-gray-800'>Our Vision</b>
          <p>Our vision at DocDock is to create a seamless healthcare experience for every user by making it easier to connect patients with trusted healthcare providers.</p>
        </div>
      </div>


      <div className='text-xl my-4'>
        <p>
          WHY <span className='text-gray-700 font-semibold'>CHOOSE US</span> 
        </p>
      </div>


      <div className='flex flex-col md:flex-row mb-20'>

        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>EFFICIENCY:</b>
        <p>Streamlined Appointment Scheduling that fits into your Busy and Fast moving Lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>CONVENIENCE:</b>
        <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
        <b>PERSONALIZATION</b>
        <p>Tailored Recommendations and Reminders to Help you stay at Top of Your Health.</p>
        </div>

      </div>

    </div>
  )
}

export default About