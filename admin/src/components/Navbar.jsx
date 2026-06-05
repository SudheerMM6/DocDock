import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import {useNavigate} from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { Button } from './ui/Button'

const Navbar = () => {

    const {aToken,setAToken} = useContext(AdminContext)
    const {dToken,setDToken} = useContext(DoctorContext)

    const navigate = useNavigate()

    const logout = ()=>{
      navigate('/')
      aToken && setAToken('')
      aToken && localStorage.removeItem('aToken')
      dToken && setDToken('')
      dToken && localStorage.removeItem('dToken')
    }

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b border-[var(--border)] bg-[var(--color-canvas-white)]'>
        <div className='flex items-center gap-3 text-xs'>
            <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} />
            <span className='px-3 py-1 rounded-nav border border-[var(--border)] text-[var(--ink-secondary)] font-mono uppercase tracking-wider text-xs'>
              {aToken ? 'Admin' : 'Doctor'}
            </span>
        </div>
        <Button onClick={logout} variant="outline" size="sm">
          Logout
        </Button>
    </div>
  )
}

export default Navbar