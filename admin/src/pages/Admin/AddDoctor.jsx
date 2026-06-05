import React, { useContext, useState } from 'react'
import { assets } from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

const AddDoctor = () => {

    const [docImg,setDocImg] = useState(false)
    const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [experience,setExperience] = useState('1 year')
    const [fees,setFees] = useState('')
    const [about,setAbout] = useState('')
    const [speciality,setSpeciality] = useState('General physician')
    const [degree,setDegree] = useState('')
    const [address1,setAddress1] = useState('')
    const [address2,setAddress2] = useState('')

    const { backendUrl,aToken } = useContext(AdminContext)

    const onSubmitHandler = async (event)=>{
        event.preventDefault()

        try {

            if (!docImg) {
                return toast.error('Image Not Selected')
            }

            const formData = new FormData()

            formData.append('image',docImg)
            formData.append('name',name)
            formData.append('email',email)
            formData.append('password',password)
            formData.append('experience',experience)
            formData.append('fees',Number(fees))
            formData.append('about',about)
            formData.append('speciality',speciality)
            formData.append('degree',degree)
            formData.append('address',JSON.stringify({line1:address1,line2:address2})) 
            
            const {data} = await axios.post(backendUrl + '/api/admin/add-doctor',formData,{headers:{aToken}})

            if (data.success) {
                toast.success(data.message)

                // after adding reset to empty
                setDocImg(false)
                setName('')
                setEmail('')
                setPassword('')
                setAddress1('')
                setAddress2('')
                setDegree('')
                setAbout('')
                setFees('')

            }else{
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.response?.data?.message || error.message)
            
        }
    }

  return (
    <form onSubmit={onSubmitHandler} className='p-5 w-full'>
      <Card className='w-full max-w-4xl max-h-[80vh] overflow-y-auto'>
        <CardHeader>
          <CardTitle className='text-xl font-bold text-[var(--ink)] tracking-[-0.02em]'>Add Doctor</CardTitle>
          <p className='text-[var(--ink-secondary)] text-sm'>Create a new doctor profile</p>
        </CardHeader>
        <CardContent className='space-y-6'>
          {/* Upload Image */}
          <div className='flex items-center gap-4'>
            <label htmlFor="doc-img" className='cursor-pointer'>
              <img className='w-16 h-16 bg-[var(--surface)] rounded-full object-cover border border-[var(--border)]' src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
            <div>
              <p className='text-sm font-medium text-[var(--ink)]'>Upload Doctor Picture</p>
              <p className='text-xs text-[var(--ink-secondary)]'>Recommended: 400x400px</p>
            </div>
          </div>

          {/* Form Grid */}
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
            {/* Left Column */}
            <div className='space-y-4'>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-[var(--ink)]'>Doctor name</label>
                <Input onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder='Dr. John Doe' required />
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-[var(--ink)]'>Doctor Email</label>
                <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder='doctor@example.com' required />
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-[var(--ink)]'>Doctor Password</label>
                <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder='********' required />
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-[var(--ink)]'>Experience</label>
                <select onChange={(e) => setExperience(e.target.value)} value={experience} className='w-full h-10 px-3 border border-[var(--border)] rounded-feature bg-[var(--color-canvas-white)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]'>
                  <option value="1 Year">1 Year</option>
                  <option value="2 Year">2 Year</option>
                  <option value="3 Year">3 Year</option>
                  <option value="4 Year">4 Year</option>
                  <option value="5 Year">5 Year</option>
                  <option value="6 Year">6 Year</option>
                  <option value="7 Year">7 Year</option>
                  <option value="8 Year">8 Year</option>
                  <option value="9 Year">9 Year</option>
                  <option value="10 Year">10 Year</option>
                </select>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-[var(--ink)]'>Fees</label>
                <Input onChange={(e) => setFees(e.target.value)} value={fees} type="number" placeholder='500' required />
              </div>
            </div>

            {/* Right Column */}
            <div className='space-y-4'>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-[var(--ink)]'>Speciality</label>
                <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className='w-full h-10 px-3 border border-[var(--border)] rounded-feature bg-[var(--color-canvas-white)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]'>
                  <option value="General physician">General physician</option>
                  <option value="Gynecologist">Gynecologist</option>
                  <option value="Dermatologist">Dermatologist</option>
                  <option value="Pediatricians">Pediatricians</option>
                  <option value="Neurologist">Neurologist</option>
                  <option value="Gastroenterologist">Gastroenterologist</option>
                </select>
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-[var(--ink)]'>Education</label>
                <Input onChange={(e) => setDegree(e.target.value)} value={degree} type="text" placeholder='MBBS, MD' required />
              </div>
              <div className='space-y-1.5'>
                <label className='text-sm font-medium text-[var(--ink)]'>Address</label>
                <Input onChange={(e) => setAddress1(e.target.value)} value={address1} type="text" placeholder='Line 1' required />
                <Input onChange={(e) => setAddress2(e.target.value)} value={address2} type="text" placeholder='Line 2' required />
              </div>
            </div>
          </div>

          {/* About */}
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-[var(--ink)]'>About Doctor</label>
            <textarea onChange={(e) => setAbout(e.target.value)} value={about} className='w-full px-3 py-2 border border-[var(--border)] rounded-feature bg-[var(--color-canvas-white)] text-[var(--ink)] focus:outline-none focus:border-[var(--ink)]' placeholder='Write about doctor experience and expertise...' rows={5} required />
          </div>

          <Button type='submit' variant="primary" size="lg">
            Add Doctor
          </Button>
        </CardContent>
      </Card>
    </form>
  )
}

export default AddDoctor
