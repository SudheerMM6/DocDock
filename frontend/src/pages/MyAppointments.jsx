import React, { useContext, useEffect, useState } from 'react'
import {AppContext} from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Divider } from '../components/layout/Divider'
import { Button } from '../components/ui/button'

const MyAppointments = () => {

const {backendUrl,token,getDoctorsData} = useContext(AppContext)

const [appointments,setAppointments] = useState([])
const [isPaying,setIsPaying] = useState(false)
const month = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]

const slotDateFormat = (slotDate)=>{
  const dateArray = slotDate.split('_')
  return dateArray[0]+" "+month[Number(dateArray[1])]+" "+dateArray[2]
}
const navigate = useNavigate()

const getUserAppointments = async()=>{
  try {
    
    const {data} = await axios.get(backendUrl + '/api/user/appointments',{headers:{token}}) 
    if (data.success) {
      setAppointments(data.appointments.reverse())
    }

  } catch (error) {
    toast.error(error.message)
    
  }
}

const cancelAppointment = async (appointmentId) =>{

  try {
    
    const {data} = await axios.post(backendUrl + '/api/user/cancel-appointment',{appointmentId},{headers:{token}})
    if (data.success) {
      toast.success(data.message)
      getUserAppointments()
      getDoctorsData()

    }else{
      toast.error(data.message)
    }
    

  } catch (error) {
    toast.error(error.message)
  }

}

const loadRazorpayScript = () =>
  new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true)
      return
    }

    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve(true)
    script.onerror = () => reject(new Error('Unable to load Razorpay checkout'))
    document.body.appendChild(script)
  })

const initPay = async (order)=>{
  if (!import.meta.env.VITE_KEY_ID) {
    toast.error('Payment key is not configured')
    return
  }

  try {
    await loadRazorpayScript()
  } catch (error) {
    toast.error(error.message)
    return
  }

  const options={
    key: import.meta.env.VITE_KEY_ID,
    amount:order.amount,
    currency:order.currency,
    name:'Appointment Payment',
    description:'Appointment Payment',
    order_id:order.id,
    receipt:order.receipt,
    handler:async(response)=>{
      try {

        const {data} = await axios.post(backendUrl+'/api/user/verifyRazorpay',response,{headers:{token}})
        if (data.success) {
          toast.success(data.message)
          getUserAppointments()
          navigate('/my-appointments')
        } else {
          toast.error(data.message)
        }
        
      } catch (error) {
        toast.error(error.message)
      }

    }
  }

  const rzp = new window.Razorpay(options)
  rzp.open()

}

const appointmentRazorpay = async(appointmentId)=>{

  try {
    setIsPaying(true)

    const {data} = await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})

    if (data.success) {
      initPay(data.order)
    } else {
      toast.error(data.message)
    }
    
  } catch (error) {
    toast.error(error.message)
  } finally {
    setIsPaying(false)
  }

}

useEffect(()=>{
  if (token) {
    getUserAppointments()
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
},[token])

  return (
    <div className="min-h-screen bg-[var(--color-canvas-white)]">
      <PageHeader title="My appointments" />

      <Section size="md">
        <Container>
          {/* Not Logged In State */}
          {!token && (
            <div className='text-center py-16 bg-[var(--surface)] rounded-card border border-[var(--border)]'>
              <p className='text-[var(--ink-secondary)]'>Please login to view your appointments</p>
              <Button onClick={() => navigate('/login')} className="mt-4">Login</Button>
            </div>
          )}

          {/* Empty State - No Appointments */}
          {token && appointments.length === 0 && (
            <div className='text-center py-16 bg-[var(--surface)] rounded-card border border-[var(--border)]'>
              <p className='text-[var(--ink)] font-medium text-lg'>No appointments yet</p>
              <p className='text-[var(--ink-secondary)] mt-2 text-sm'>Book your first appointment with a doctor</p>
              <Button onClick={() => navigate('/doctors')} className="mt-5">Browse Doctors</Button>
            </div>
          )}

          {/* Appointments List - Ledger Style */}
          {token && appointments.length > 0 && (
            <div className="border border-[var(--border)] rounded-card overflow-hidden">
              {appointments.map((item, index) => (
                <div key={index}>
                  <div className="p-6 bg-[var(--color-canvas-white)]">
                    <div className="flex flex-col sm:flex-row gap-6">
                      {/* Doctor Image */}
                      <img
                        className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-card bg-[var(--surface)]"
                        src={item.docData.image}
                        alt={item.docData.name}
                      />

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-[var(--ink)]">{item.docData.name}</h3>
                            <p className="text-sm text-[var(--ink-secondary)]">{item.docData.speciality}</p>
                          </div>

                          {/* Status Badge */}
                          <div className="flex-shrink-0">
                            {!item.cancelled && item.payment && !item.isCompleted && (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Paid</Badge>
                            )}
                            {item.cancelled && !item.isCompleted && (
                              <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">Cancelled</Badge>
                            )}
                            {item.isCompleted && (
                              <Badge variant="outline" className="bg-[var(--surface)] text-[var(--ink-secondary)]">Completed</Badge>
                            )}
                            {!item.cancelled && !item.payment && !item.isCompleted && (
                              <Badge variant="outline" className="bg-[var(--surface)] text-[var(--ink-secondary)]">Pending payment</Badge>
                            )}
                          </div>
                        </div>

                        {/* Appointment Details */}
                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <p className="font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider">Date & Time</p>
                            <p className="text-sm font-medium text-[var(--ink)]">{slotDateFormat(item.slotDate)} · {item.slotTime}</p>
                          </div>
                          <div>
                            <p className="font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider">Location</p>
                            <p className="text-sm text-[var(--ink-secondary)] truncate">{item.docData.address.line1}</p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex flex-wrap gap-2">
                          {!item.cancelled && !item.payment && !item.isCompleted && (
                            <Button
                              variant="primary"
                              size="sm"
                              disabled={isPaying}
                              onClick={() => appointmentRazorpay(item._id)}
                            >
                              {isPaying ? 'Opening payment...' : 'Pay now'}
                            </Button>
                          )}
                          {!item.cancelled && !item.isCompleted && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => cancelAppointment(item._id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              Cancel
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {index < appointments.length - 1 && <Divider />}
                </div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </div>
  )
}

export default MyAppointments
