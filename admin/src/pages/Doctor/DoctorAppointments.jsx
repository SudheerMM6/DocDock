import React from 'react'
import { useContext } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import { Card } from '../../components/ui/Card'

const DoctorAppointments = () => {

  const {dToken,appointments,getAppointments,completeAppointment,cancelAppointment} = useContext(DoctorContext)

  const {calculateAge,slotDateFormat,currency} = useContext(AppContext)

  useEffect(()=>{
    if (dToken) {
      getAppointments()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[dToken])

  return (
    <div className='p-5'>
      <h1 className='text-xl font-bold text-[var(--ink)] tracking-[-0.02em] mb-4'>All Appointments</h1>

      <Card className='overflow-hidden'>
        {/* Table Header */}
        <div className='hidden sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] bg-[var(--surface)] py-3 px-6 border-b border-[var(--border)]'>
          <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase'>#</p>
          <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase'>Patient</p>
          <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase'>Payment</p>
          <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase'>Age</p>
          <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase'>Date & Time</p>
          <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase'>Fees</p>
          <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase'>Actions</p>
        </div>

        {/* Table Body */}
        <div className='divide-y divide-[var(--border)]'>
          {appointments.map((item, index) => (
            <div className='flex flex-wrap justify-between max-sm:gap-3 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] items-center text-[var(--ink-secondary)] py-3 px-6 hover:bg-[var(--surface)] transition-colors' key={index}>
              <p className='max-sm:hidden text-sm'>{index + 1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-10 h-10 rounded-full object-cover' src={item.userData.image} alt="" />
                <p className='text-[var(--ink)] font-medium text-sm'>{item.userData.name}</p>
              </div>
              <div>
                <span className={`text-xs inline px-2 py-0.5 rounded-nav border ${item.payment ? 'border-green-200 bg-green-50 text-green-600' : 'border-[var(--border)] bg-[var(--surface)] text-[var(--ink-secondary)]'}`}>
                  {item.payment ? 'Online' : 'Cash'}
                </span>
              </div>
              <p className='max-sm:hidden text-sm'>{calculateAge(item.userData.dob)}</p>
              <p className='text-sm'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
              <p className='text-sm font-medium text-[var(--ink)]'>{currency}{item.amount}</p>

              {item.cancelled
                ? <span className='px-2 py-1 rounded-nav bg-red-50 text-red-600 text-xs font-medium'>Cancelled</span>
                : item.isCompleted
                  ? <span className='px-2 py-1 rounded-nav bg-green-50 text-green-600 text-xs font-medium'>Completed</span>
                  : <div className='flex gap-2'>
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className='text-sm text-red-600 hover:bg-red-50 px-2 py-1 rounded-nav transition-colors'
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => completeAppointment(item._id)}
                        className='text-sm text-green-600 hover:bg-green-50 px-2 py-1 rounded-nav transition-colors'
                      >
                        Complete
                      </button>
                    </div>
              }
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default DoctorAppointments