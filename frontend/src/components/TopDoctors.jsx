import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const TopDoctors = () => {

    const navigate=useNavigate()
    const {doctors} = useContext(AppContext)

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-ink md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
        <p className='sm:w-1/3 text-center text-sm text-ink-secondary'>Browse available doctors and choose a slot.</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item,index)=>(
                <div onClick={()=>{navigate(`/appointment/${item._id}`); scrollTo(0,0)}} className='border border-border-custom rounded-xl overflow-hidden cursor-pointer hover:border-[var(--ink)] transition-colors bg-surface-elevated' key={index}>
                    <img className='bg-soft' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-600' : 'text-ink-secondary'}`}>
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-500' : 'bg-ink-secondary'}  rounded-full`}></p><p>{item.available ? 'Available' : 'Not Available'}</p>
                        </div>
                        <p className='text-ink text-lg font-medium'>{item.name}</p>
                        <p className='text-ink-secondary text-sm '>{item.speciality}</p>
                    </div>
                </div>
            ))}
        </div>
        <button onClick={()=>{ navigate('/doctors'); scrollTo(0,0) }} className='bg-[var(--surface)] text-[var(--ink)] border-2 border-[var(--ink)] px-12 py-3 rounded-full mt-10 hover:bg-[var(--ink)] hover:text-[var(--color-canvas-white)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/40 font-medium'>View All Doctors</button>
    </div>
  )
}

export default TopDoctors
