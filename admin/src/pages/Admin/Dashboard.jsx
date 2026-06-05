import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'
import { Card, CardContent } from '../../components/ui/Card'
import { Divider } from '../../components/layout/Divider'

const Dashboard = () => {

  const {aToken,getDashData,cancelAppointment,dashData} = useContext(AdminContext)

  const {slotDateFormat} = useContext(AppContext)

  useEffect(()=>{
    if (aToken) {
      getDashData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[aToken])

  return dashData && (
    <div className='p-5'>
      {/* Stats Cards */}
      <div className='flex flex-wrap gap-3'>
        <Card className='flex items-center gap-3 p-4 min-w-[200px] cursor-pointer hover:border-[var(--ink)] transition-colors'>
          <img className='w-12 opacity-70' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-2xl font-bold text-[var(--ink)]'>{dashData.doctors}</p>
            <p className='text-[var(--ink-secondary)] text-sm'>Doctors</p>
          </div>
        </Card>

        <Card className='flex items-center gap-3 p-4 min-w-[200px] cursor-pointer hover:border-[var(--ink)] transition-colors'>
          <img className='w-12 opacity-70' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-2xl font-bold text-[var(--ink)]'>{dashData.appointments}</p>
            <p className='text-[var(--ink-secondary)] text-sm'>Appointments</p>
          </div>
        </Card>

        <Card className='flex items-center gap-3 p-4 min-w-[200px] cursor-pointer hover:border-[var(--ink)] transition-colors'>
          <img className='w-12 opacity-70' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-2xl font-bold text-[var(--ink)]'>{dashData.patients}</p>
            <p className='text-[var(--ink-secondary)] text-sm'>Patients</p>
          </div>
        </Card>
      </div>

      {/* Latest Bookings - Ledger Style */}
      <Card className='mt-8 overflow-hidden'>
        <div className='flex items-center gap-2 px-6 py-4 border-b border-[var(--border)] bg-[var(--surface)]'>
          <img className='w-5 opacity-70' src={assets.list_icon} alt="" />
          <p className='font-semibold text-[var(--ink)]'>Latest Bookings</p>
        </div>

        <div className='divide-y divide-[var(--border)]'>
          {dashData.latestAppointments.map((item, index) => (
            <div className='flex items-center px-6 py-4 gap-4 hover:bg-[var(--surface)] transition-colors' key={index}>
              <img className='rounded-full w-10 h-10 object-cover' src={item.docData.image} alt="" />
              <div className='flex-1 min-w-0'>
                <p className='text-[var(--ink)] font-medium text-sm truncate'>{item.docData.name}</p>
                <p className='text-[var(--ink-secondary)] text-xs'>{slotDateFormat(item.slotDate)}</p>
              </div>
              {item.cancelled
                ? <span className='px-2 py-1 rounded-nav bg-red-50 text-red-600 text-xs font-medium'>Cancelled</span>
                : item.isCompleted
                  ? <span className='px-2 py-1 rounded-nav bg-green-50 text-green-600 text-xs font-medium'>Completed</span>
                  : <button
                      onClick={() => cancelAppointment(item._id)}
                      className='px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-nav transition-colors'
                    >
                      Cancel
                    </button>
              }
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

export default Dashboard