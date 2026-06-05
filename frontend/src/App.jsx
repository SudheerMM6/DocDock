import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import Doctors from './pages/Doctors'
import Login from './pages/Login'
import About from './pages/About'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { FloatingDockNav } from './components/FloatingDockNav'
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

// Lazy load heavy pages
const MyProfile = lazy(() => import('./pages/MyProfile'))
const MyAppointments = lazy(() => import('./pages/MyAppointments'))
const Appointment = lazy(() => import('./pages/Appointment'))
const LandingPage = lazy(() => import('./pages/LandingPage'))


const App = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <ToastContainer />
      <Navbar />
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-pulse h-4 w-32 bg-[var(--surface)] rounded" /></div>}>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/doctors' element={<Doctors />} />
          <Route path='/doctors/:speciality' element={<Doctors />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path='/my-appointments' element={<MyAppointments />} />
          <Route path='/appointment/:docId' element={<Appointment />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>

      <Footer />
      <FloatingDockNav />

    </div>
  )
}

export default App
