import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { Card } from '../../components/ui/Card'

const DoctorsList = () => {

    const {doctors,aToken,getAllDoctors,changeAvailability} = useContext(AdminContext)

    useEffect(()=>{
      if (aToken) {
        getAllDoctors()
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[aToken])

  return (
    <div className='p-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-xl font-bold text-[var(--ink)] tracking-[-0.02em] mb-4'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 gap-y-6'>
        {
          doctors.map((item, index) => (
            <Card className='max-w-56 overflow-hidden cursor-pointer group hover:border-[var(--ink)] transition-colors' key={index}>
              <div className='aspect-square bg-[var(--surface)] overflow-hidden'>
                <img className='w-full h-full object-cover' src={item.image} alt="" />
              </div>
              <div className='p-4'>
                <p className='text-[var(--ink)] text-lg font-medium'>{item.name}</p>
                <p className='text-[var(--ink-secondary)] text-sm'>{item.speciality}</p>
                <div className='mt-3 flex items-center gap-2 text-sm'>
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                    className='accent-[var(--accent)]'
                  />
                  <span className={item.available ? 'text-green-600' : 'text-[var(--ink-secondary)]'}>
                    {item.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
              </div>
            </Card>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorsList