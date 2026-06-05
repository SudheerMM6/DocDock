import React, { useContext, useEffect, useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Card, CardContent } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

const DoctorProfile = () => {

  const { dToken, profileData, setProfileData, getProfileData, backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)

  const [isEdit, setIsEdit] = useState(false)

  const updateProfile = async () => {

    try {

      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }

      const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } })

      if (data.success) {
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
      } else {
        toast.error(data.message)
      }

    } catch (error) {

      toast.error(error.response?.data?.message || error.message)

    }

  }

  useEffect(() => {
    if (dToken) {
      getProfileData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dToken])

  return profileData && (
    <div className='p-5'>
      <div className='flex flex-col lg:flex-row gap-6'>
        {/* Profile Image */}
        <div className='flex-shrink-0'>
          <img className='w-full sm:w-64 aspect-[3/4] object-cover rounded-card border border-[var(--border)] bg-[var(--surface)]' src={profileData.image} alt="" />
        </div>

        {/* Profile Card */}
        <Card className='flex-1'>
          <CardContent className='p-6 space-y-6'>
            {/* Header */}
            <div>
              <h1 className='text-2xl font-bold text-[var(--ink)] tracking-[-0.02em]'>{profileData.name}</h1>
              <div className='flex items-center gap-2 mt-1 text-[var(--ink-secondary)]'>
                <p>{profileData.degree} · {profileData.speciality}</p>
                <span className='px-2 py-0.5 border border-[var(--border)] text-xs rounded-nav'>
                  {profileData.experience}
                </span>
              </div>
            </div>

            {/* About */}
            <div>
              <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider mb-2'>About</p>
              <p className='text-sm text-[var(--ink-secondary)] leading-relaxed'>
                {profileData.about}
              </p>
            </div>

            {/* Fees */}
            <div>
              <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider mb-2'>Appointment Fee</p>
              {isEdit ? (
                <Input
                  type="number"
                  onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))}
                  value={profileData.fees}
                  className="w-40"
                />
              ) : (
                <p className='text-xl font-bold text-[var(--ink)]'>{currency}{profileData.fees}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <p className='font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider mb-2'>Address</p>
              <div className='space-y-2'>
                {isEdit ? (
                  <>
                    <Input
                      type="text"
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                      value={profileData.address.line1}
                      placeholder="Line 1"
                    />
                    <Input
                      type="text"
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                      value={profileData.address.line2}
                      placeholder="Line 2"
                    />
                  </>
                ) : (
                  <p className='text-sm text-[var(--ink-secondary)]'>
                    {profileData.address.line1}<br />{profileData.address.line2}
                  </p>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className='flex items-center gap-2'>
              <input
                onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))}
                checked={profileData.available}
                type="checkbox"
                id="available"
                className='accent-[var(--accent)]'
              />
              <label htmlFor="available" className={profileData.available ? 'text-green-600' : 'text-[var(--ink-secondary)]'}>
                {profileData.available ? 'Available for appointments' : 'Not available'}
              </label>
            </div>

            {/* Actions */}
            <div className='pt-4'>
              {isEdit ? (
                <Button onClick={() => updateProfile()} variant="primary">
                  Save Changes
                </Button>
              ) : (
                <Button onClick={() => setIsEdit(true)} variant="outline">
                  Edit Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default DoctorProfile
