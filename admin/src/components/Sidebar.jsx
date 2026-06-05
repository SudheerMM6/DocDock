import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'
import { DoctorContext } from '../context/DoctorContext'

const Sidebar = () => {

    const {aToken} = useContext(AdminContext)
    const {dToken} = useContext(DoctorContext)

  return (
    <div className='min-h-screen bg-[var(--color-canvas-white)] border-r border-[var(--border)]'>
        {
            aToken && <ul className='text-[var(--ink-secondary)] mt-5'>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-6 mx-2 md:mx-3 rounded-nav transition-colors ${isActive ? 'bg-[var(--surface)] text-[var(--ink)] font-medium' : 'hover:bg-[var(--surface)]'}`} to={'/admin-dashboard'}>
                <img className="w-5 opacity-70" src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-6 mx-2 md:mx-3 rounded-nav transition-colors ${isActive ? 'bg-[var(--surface)] text-[var(--ink)] font-medium' : 'hover:bg-[var(--surface)]'}`} to={'/all-appointments'}>
                <img className="w-5 opacity-70" src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-6 mx-2 md:mx-3 rounded-nav transition-colors ${isActive ? 'bg-[var(--surface)] text-[var(--ink)] font-medium' : 'hover:bg-[var(--surface)]'}`} to={'/add-doctor'}>
                <img className="w-5 opacity-70" src={assets.add_icon} alt="" />
                <p className='hidden md:block'>Add Doctor</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-6 mx-2 md:mx-3 rounded-nav transition-colors ${isActive ? 'bg-[var(--surface)] text-[var(--ink)] font-medium' : 'hover:bg-[var(--surface)]'}`} to={'/doctor-list'}>
                <img className="w-5 opacity-70" src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Doctors List</p>
            </NavLink>

            </ul>
        }

         {
            dToken && <ul className='text-[var(--ink-secondary)] mt-5'>

            <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-6 mx-2 md:mx-3 rounded-nav transition-colors ${isActive ? 'bg-[var(--surface)] text-[var(--ink)] font-medium' : 'hover:bg-[var(--surface)]'}`} to={'/doctor-dashboard'}>
                <img className="w-5 opacity-70" src={assets.home_icon} alt="" />
                <p className='hidden md:block'>Dashboard</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-6 mx-2 md:mx-3 rounded-nav transition-colors ${isActive ? 'bg-[var(--surface)] text-[var(--ink)] font-medium' : 'hover:bg-[var(--surface)]'}`} to={'/doctor-appointments'}>
                <img className="w-5 opacity-70" src={assets.appointment_icon} alt="" />
                <p className='hidden md:block'>Appointments</p>
            </NavLink>
            <NavLink className={({isActive})=>`flex items-center gap-3 py-3 px-3 md:px-6 mx-2 md:mx-3 rounded-nav transition-colors ${isActive ? 'bg-[var(--surface)] text-[var(--ink)] font-medium' : 'hover:bg-[var(--surface)]'}`} to={'/doctor-profile'}>
                <img className="w-5 opacity-70" src={assets.people_icon} alt="" />
                <p className='hidden md:block'>Profile</p>
            </NavLink>

            </ul>
        }
    </div>
  )
}

export default Sidebar