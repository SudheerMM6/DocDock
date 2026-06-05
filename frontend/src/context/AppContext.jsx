import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import {toast} from 'react-toastify'

/* eslint-disable react-refresh/only-export-components */
export const AppContext = createContext()

const AppContextprovider = (props)=>{

    const currencySymbol= '$'
    const backendUrl =
      import.meta.env.VITE_API_URL ||
      (import.meta.env.DEV ? "http://localhost:4000" : "")
    const [doctors,setDoctors] = useState([])
    const [doctorsLoading,setDoctorsLoading] = useState(true)
    const [token,setToken] = useState(localStorage.getItem('token')?localStorage.getItem('token'):false)
    const [userData,setUserData] = useState(false) 

const getDoctorsData = async () =>{

    try {
        setDoctorsLoading(true)
        const {data} = await axios.get(backendUrl + '/api/doctor/list')
        if (data.success) {
            setDoctors(data.doctors)
        }else{
            toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.response?.data?.message || error.message)
    } finally {
        setDoctorsLoading(false)
    }

}

const loadUserProfileData = async ()=>{
    try {
        
        const {data}= await axios.get(backendUrl + '/api/user/get-profile',{headers:{token}})
        if (data.success) {
            setUserData(data.userData)
        }else{
            toast.error(data.message)
        }

    } catch (error) {
        toast.error(error.response?.data?.message || error.message)
    }
}

const value={
    doctors,getDoctorsData,
    doctorsLoading,
    currencySymbol,
    token,setToken,
    backendUrl,
    userData,setUserData,
    loadUserProfileData
}

useEffect(()=>{
  
    getDoctorsData()

// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

useEffect(()=>{
    if (token) {
        loadUserProfileData()
    }else{
        setUserData(false)
    }
// eslint-disable-next-line react-hooks/exhaustive-deps
},[token])

return(
    <AppContext.Provider value={value}>
        {props.children}
    </AppContext.Provider>
)

}
export default AppContextprovider
