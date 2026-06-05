import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {assets} from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Input } from '@/components/ui/input'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Divider } from '../components/layout/Divider'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

const MyProfile = () => {

const {userData,setUserData,token,backendUrl,loadUserProfileData} = useContext(AppContext)
const navigate = useNavigate()

const [isEdit,setIsEdit] = useState(false)
const [image,setImage] = useState(false)

// Not logged in state
if (!token) {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-white)]">
      <PageHeader title="My profile" />
      <Section size="md">
        <Container>
          <div className='text-center py-16 bg-[var(--surface)] rounded-card border border-[var(--border)]'>
            <div className='w-16 h-16 bg-[var(--border)] rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg className='w-8 h-8 text-[var(--ink-secondary)]' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' />
              </svg>
            </div>
            <p className='text-[var(--ink)] font-medium text-lg'>Please login to view your profile</p>
            <p className='text-[var(--ink-secondary)] mt-2 text-sm'>Access your appointments and manage your account</p>
            <Button onClick={() => navigate('/login')} className="mt-5">Login to Continue</Button>
          </div>
        </Container>
      </Section>
    </div>
  )
}

// Loading state
if (!userData) {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-white)]">
      <PageHeader title="My profile" />
      <Section size="md">
        <Container>
          <div className='max-w-lg animate-pulse'>
            <div className='w-36 h-36 bg-[var(--surface)] rounded-card mb-4' />
            <div className='h-8 bg-[var(--surface)] rounded w-1/2 mb-4' />
            <div className='h-4 bg-[var(--surface)] rounded w-3/4 mb-2' />
            <div className='h-4 bg-[var(--surface)] rounded w-1/2' />
          </div>
        </Container>
      </Section>
    </div>
  )
}

const updateUserProfileData = async()=>{
  try {
    const formData = new FormData()
    formData.append('name',userData.name)
    formData.append('phone',userData.phone)
    formData.append('address',JSON.stringify(userData.address))
    formData.append('gender',userData.gender)
    formData.append('dob',userData.dob)
    image && formData.append('image',image)
    const {data} = await axios.post(backendUrl + '/api/user/update-profile',formData,{headers:{token}})
    if (data.success) {
      toast.success(data.message)
      await loadUserProfileData()
      setIsEdit(false)
      setImage(false)
    }else{
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message)
  }
}

  return userData && (
    <div className="min-h-screen bg-[var(--color-canvas-white)]">
      <PageHeader title="My profile" />
      <Section size="md">
        <Container>
          <div className="max-w-2xl">
            {/* Profile Image */}
            <div className="mb-8">
              {isEdit ? (
                <label htmlFor="image" className="inline-block cursor-pointer">
                  <div className="relative">
                    <img
                      className="w-36 h-36 object-cover rounded-card opacity-75 border border-[var(--border)]"
                      src={image ? URL.createObjectURL(image) : userData.image}
                      alt=""
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img className="w-10" src={image ? '' : assets.upload_icon} alt="" />
                    </div>
                  </div>
                  <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                </label>
              ) : (
                <img
                  className="w-36 h-36 object-cover rounded-card border border-[var(--border)]"
                  src={userData.image}
                  alt=""
                />
              )}
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              {/* Name */}
              {isEdit ? (
                <div>
                  <label className="text-sm font-medium text-[var(--ink-secondary)] mb-1.5 block">Name</label>
                  <Input
                    type="text"
                    value={userData.name}
                    onChange={e => setUserData(prev => ({ ...prev, name: e.target.value }))}
                  />
                </div>
              ) : (
                <h2 className="text-3xl font-bold text-[var(--ink)] tracking-[-0.03em]">{userData.name}</h2>
              )}

              <Divider />

              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-[var(--ink-secondary)] uppercase tracking-wider">
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                    <label className="text-sm font-medium text-[var(--ink)]">Email</label>
                    <p className="text-[var(--ink-secondary)]">{userData.email}</p>
                  </div>

                  <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                    <label className="text-sm font-medium text-[var(--ink)]">Phone</label>
                    {isEdit ? (
                      <Input
                        type="text"
                        value={userData.phone}
                        onChange={e => setUserData(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    ) : (
                      <p className="text-[var(--ink-secondary)]">{userData.phone}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-[140px_1fr] gap-4">
                    <label className="text-sm font-medium text-[var(--ink)]">Address</label>
                    {isEdit ? (
                      <div className="space-y-2">
                        <Input
                          onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                          value={userData.address.line1}
                          type="text"
                          placeholder="Line 1"
                        />
                        <Input
                          onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                          value={userData.address.line2}
                          type="text"
                          placeholder="Line 2"
                        />
                      </div>
                    ) : (
                      <p className="text-[var(--ink-secondary)]">
                        {userData.address.line1}<br />{userData.address.line2}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm font-medium text-[var(--ink-secondary)] uppercase tracking-wider">
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                    <label className="text-sm font-medium text-[var(--ink)]">Gender</label>
                    {isEdit ? (
                      <select
                        className="h-10 px-3 rounded-input border border-[var(--border)] bg-[var(--color-canvas-white)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]"
                        onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                        value={userData.gender}
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    ) : (
                      <p className="text-[var(--ink-secondary)]">{userData.gender}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-[140px_1fr] gap-4 items-center">
                    <label className="text-sm font-medium text-[var(--ink)]">Birthday</label>
                    {isEdit ? (
                      <Input
                        type="date"
                        onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))}
                        value={userData.dob}
                      />
                    ) : (
                      <p className="text-[var(--ink-secondary)]">{userData.dob}</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <div className="pt-4">
                {isEdit ? (
                  <Button onClick={updateUserProfileData} variant="primary" size="lg">
                    Save Information
                  </Button>
                ) : (
                  <Button onClick={() => setIsEdit(true)} variant="outline" size="lg">
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default MyProfile
