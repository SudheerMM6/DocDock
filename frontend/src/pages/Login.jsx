import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import AuthForm from '@/components/AuthForm'

const Login = () => {

  const {backendUrl,token,setToken} = useContext(AppContext) 
  const navigate = useNavigate()

  const [isLogin, setIsLogin] = useState(false)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')
    const firstname = formData.get('firstname')
    const lastname = formData.get('lastname')
    const name = `${firstname || ''} ${lastname || ''}`.trim()

    try {
      
      if (!isLogin) {
        // Sign Up
        const {data} = await axios.post(backendUrl + '/api/user/register',{name,password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
          toast.success('Account created successfully!')
        }else{
          toast.error(data.message)
        }
      }else{
        // Login
        const {data} = await axios.post(backendUrl + '/api/user/login',{password,email})
        if (data.success) {
          localStorage.setItem('token',data.token)
          setToken(data.token)
          toast.success('Welcome back!')
        }else{
          toast.error(data.message)
        }

      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(()=>{
    if (token) {
      navigate('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[token])

  return (
    <div className='min-h-[80vh] flex items-center justify-center py-12 px-4'>
      <AuthForm
        onSubmit={onSubmitHandler}
        isLogin={isLogin}
        onToggleMode={() => setIsLogin(!isLogin)}
      />
    </div>
  )
}

export default Login
