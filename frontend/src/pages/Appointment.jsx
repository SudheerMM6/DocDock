import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Divider } from '../components/layout/Divider'
import { Card, CardContent } from '../components/ui/card'
import { Button } from '../components/ui/button'

const Appointment = () => {

  const { docId } = useParams()
  const { doctors, currencySymbol, backendUrl, token, getDoctorsData } = useContext(AppContext)
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

  const navigate = useNavigate()

  const [docInfo, setDocInfo] = useState(null)
  const [docSlots, setDocSlots] = useState([])
  const [slotIndex, setSlotIndex] = useState(0)
  const [slotTime, setSlotTime] = useState('')

  const fetchDocInfo = async () => {
    const docInfo = doctors.find(doc => doc._id === docId)
    setDocInfo(docInfo)
  }

  const getAvailableSlots = async () => {
    setDocSlots([])

    // getting current Date
    let today = new Date()

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate() + i)

      let endTime = new Date()
      endTime.setDate(today.getDate() + i)
      endTime.setHours(21, 0, 0, 0)


      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
      } else {
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }

      let timeSlots = []
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentDate.getDate()
        let month = currentDate.getMonth() + 1
        let year = currentDate.getFullYear()

        const slotDate = day + '_' + month + '_' + year
        const slotTime = formattedTime

        const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true

        if (isSlotAvailable) {
          // add time slots
          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        //increment current time by 30 minutes

        currentDate.setMinutes(currentDate.getMinutes() + 30)

      }

      setDocSlots(prev => ([...prev, timeSlots]))
    }
  }

  const bookAppointment = async () => {
    if (!token) {
      toast.warn('Login to Book Appointment')
      return navigate('/login')
    }

    try {

      const date = docSlots[slotIndex][0].datetime
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotDate = day + '_' + month + '_' + year

      const { data } = await axios.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } })

      if (data.success) {
        toast.success(data.message)
        getDoctorsData()
        navigate('/my-appointments')
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.response?.data?.message || error.message)

    }

  }

  useEffect(() => {
    fetchDocInfo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doctors, docId])

  useEffect(() => {
    getAvailableSlots()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [docInfo])

  return docInfo && (
    <div className="min-h-screen bg-[var(--color-canvas-white)]">
      {/* Page Header */}
      <PageHeader
        eyebrow="Book appointment"
        title={docInfo.name}
        subtitle={`${docInfo.degree} · ${docInfo.speciality}`}
      />

      <Section size="md">
        <Container>
          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Left Column - Doctor Info & Slot Selection */}
            <div className="space-y-8">
              {/* Doctor Card */}
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="flex flex-col sm:flex-row">
                    <img
                      className="w-full sm:w-48 sm:h-48 object-cover bg-[var(--surface)]"
                      src={docInfo.image}
                      alt={docInfo.name}
                    />
                    <div className="p-6 flex-1">
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold text-[var(--ink)]">{docInfo.name}</h2>
                      </div>
                      <p className="text-[var(--ink-secondary)] text-sm mt-1">
                        {docInfo.degree} · {docInfo.speciality}
                      </p>
                      <span className="inline-block mt-2 px-2 py-0.5 border border-[var(--border)] text-xs rounded-full text-[var(--ink-secondary)]">
                        {docInfo.experience}
                      </span>

                      <Divider className="my-4" />

                      <div>
                        <p className="text-sm font-medium text-[var(--ink)] flex items-center gap-1">
                          About
                          <img className="w-4 h-4 opacity-60" src={assets.info_icon} alt="" />
                        </p>
                        <p className="text-sm text-[var(--ink-secondary)] mt-1 leading-relaxed">
                          {docInfo.about}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Slot Selection */}
              <div>
                <p className="font-medium text-[var(--ink)] mb-4">Select date</p>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {docSlots.length > 0 && docSlots.map((item, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setSlotIndex(index)}
                      className={`flex-shrink-0 text-center py-3 px-3 min-w-[64px] rounded-pill transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20 ${
                        slotIndex === index
                          ? 'bg-[var(--ink)] text-white'
                          : 'bg-[var(--color-canvas-white)] text-[var(--ink-secondary)] border border-[var(--border)] hover:border-[var(--ink)]'
                      }`}
                    >
                      <span className="block text-xs font-medium uppercase">
                        {item[0] && daysOfWeek[item[0].datetime.getDay()]}
                      </span>
                      <span className="block text-lg font-semibold mt-0.5">
                        {item[0] && item[0].datetime.getDate()}
                      </span>
                    </button>
                  ))}
                </div>

                <p className="font-medium text-[var(--ink)] mb-4 mt-6">Select time</p>
                <div className="flex gap-2 flex-wrap">
                  {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setSlotTime(item.time)}
                      className={`text-sm px-4 py-2 rounded-pill transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ink)]/20 ${
                        item.time === slotTime
                          ? 'bg-[var(--ink)] text-white'
                          : 'text-[var(--ink-secondary)] border border-[var(--border)] bg-[var(--color-canvas-white)] hover:border-[var(--ink)]'
                      }`}
                    >
                      {item.time.toLowerCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Summary Card */}
            <div>
              <Card className="sticky top-6">
                <CardContent className="p-6 space-y-6">
                  <div>
                    <p className="font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider mb-1">Fee</p>
                    <p className="text-3xl font-bold text-[var(--ink)] tracking-[-0.02em]">
                      {currencySymbol}{docInfo.fees}
                    </p>
                  </div>

                  <Divider />

                  {slotTime && (
                    <div className="space-y-3">
                      <div>
                        <p className="font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider">Date</p>
                        <p className="text-sm font-medium text-[var(--ink)]">
                          {docSlots[slotIndex][0]?.datetime.toLocaleDateString('en-US', {
                            weekday: 'long',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider">Time</p>
                        <p className="text-sm font-medium text-[var(--ink)]">{slotTime}</p>
                      </div>
                    </div>
                  )}

                  {!slotTime && (
                    <p className="text-sm text-[var(--ink-secondary)]">
                      Select a date and time to continue
                    </p>
                  )}

                  <Button
                    onClick={bookAppointment}
                    disabled={!slotTime}
                    variant="primary"
                    size="lg"
                    className="w-full"
                  >
                    Book appointment
                  </Button>

                  <Divider />

                  <p className="text-xs text-[var(--ink-secondary)] text-center">
                    Payments processed securely via Razorpay
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Doctors */}
      <Section size="md" className="bg-[var(--surface)]">
        <Container>
          <RelatedDoctors docId={docId} speciality={docInfo.speciality} />
        </Container>
      </Section>
    </div>
  )
}

export default Appointment
