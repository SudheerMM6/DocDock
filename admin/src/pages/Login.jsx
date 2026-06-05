import React, { useContext, useState } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { DoctorContext } from '../context/DoctorContext'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'

const Login = () => {

    const [state,setState] = useState('Admin')

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const {setAToken,backendUrl} = useContext(AdminContext)
    const {setDToken} = useContext(DoctorContext)

    const onSubmitHandler = async (event)=>{

        event.preventDefault()

        try {
            
            if (state === 'Admin') {
                
                const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
                if (data.success) {
                    localStorage.setItem('aToken',data.token)
                    setAToken(data.token)
                }else{
                    toast.error(data.message)
                }
            }else{

                const {data} = await axios.post(backendUrl+'/api/doctor/login',{email,password})
                if (data.success) {
                    localStorage.setItem('dToken',data.token)
                    setDToken(data.token)
                }else{
                    toast.error(data.message)
                }

            }

        } catch (error) {
            toast.error(error.message)
        }

    }

  return (
    <form onSubmit={onSubmitHandler} className='min-h-screen bg-[var(--color-canvas-white)] flex items-center justify-center px-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className="text-center">
          <CardTitle className='text-2xl font-bold text-[var(--ink)] tracking-[-0.02em]'>
            <span className='text-primary'>{state} </span>
            Login
          </CardTitle>
          <p className='text-[var(--ink-secondary)] text-sm mt-1'>
            Sign in to access your dashboard
          </p>
        </CardHeader>
        <CardContent className='space-y-4'>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-[var(--ink)]'>Email</label>
            <Input
              onChange={(e)=>setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className='space-y-1.5'>
            <label className='text-sm font-medium text-[var(--ink)]'>Password</label>
            <Input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <Button type='submit' variant="primary" size="lg" className='w-full mt-2'>
            Login
          </Button>
          {
            state === 'Admin'
            ? <p className='text-sm text-center text-[var(--ink-secondary)] mt-4'>
                Doctor Login?{' '}
                <span
                  className='text-[var(--ink)] font-medium cursor-pointer hover:underline'
                  onClick={()=>setState('Doctor')}
                >
                  Click here
                </span>
              </p>
            : <p className='text-sm text-center text-[var(--ink-secondary)] mt-4'>
                Admin Login?{' '}
                <span
                  className='text-[var(--ink)] font-medium cursor-pointer hover:underline'
                  onClick={()=>setState('Admin')}
                >
                  Click here
                </span>
              </p>
          }
        </CardContent>
      </Card>
    </form>
  )
}

export default Login