import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { DoctorGridSkeleton } from '../components/DoctorCardSkeleton'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Button } from '../components/ui/button'

const Doctors = () => {

  const { speciality } = useParams()

  const [filterDoc,setFilterDoc] = useState([])

  const navigate =useNavigate();
    
  const {doctors, doctorsLoading} = useContext(AppContext)
  const doctorCountLabel = doctorsLoading
    ? 'Loading doctor profiles'
    : doctors.length > 0
      ? `${doctors.length} doctor profiles available`
      : 'Doctor profiles will appear after admin setup'

  const applyFilter =()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
    applyFilter()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[doctors,speciality])

  return (
  <div className='min-h-screen bg-[var(--color-canvas-white)]'>
    <PageHeader
      eyebrow="Browse"
      title="Find your doctor"
      subtitle={doctorCountLabel}
    />

    <Section size="sm">
      <Container>

        <div className='flex flex-wrap gap-2 mb-6 pb-5 border-b border-[var(--border)]'>
          <button
            onClick={() => navigate('/doctors')}
            className={`px-4 py-2 rounded-pill text-sm font-medium transition-all ${
              !speciality
                ? 'bg-[var(--ink)] text-white'
                : 'bg-[var(--color-canvas-white)] text-[var(--ink-secondary)] border border-[var(--border)] hover:border-[var(--ink)]'
            }`}
          >
            All Doctors
          </button>
          {['General physician', 'Gynecologist', 'Dermatologist', 'Pediatricians', 'Neurologist', 'Gastroenterologist'].map((spec) => (
            <button
              key={spec}
              type="button"
              onClick={() => navigate(`/doctors/${spec}`)}
              className={`px-4 py-2 rounded-pill text-sm font-medium transition-all whitespace-nowrap ${
                speciality === spec
                  ? 'bg-[var(--ink)] text-white'
                  : 'bg-[var(--color-canvas-white)] text-[var(--ink-secondary)] border border-[var(--border)] hover:border-[var(--ink)]'
              }`}
            >
              {spec}
            </button>
          ))}
        </div>

        {doctorsLoading ? (
          <DoctorGridSkeleton count={10} />
        ) : filterDoc.length === 0 ? (
          <div className='text-center py-16 bg-[var(--surface)] rounded-card border border-[var(--border)]'>
            <p className='text-[var(--ink-secondary)]'>No doctors found for this specialty.</p>
            <Button variant="ghost" onClick={() => navigate('/doctors')} className="mt-4">View all doctors</Button>
          </div>
        ) : (
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
            {filterDoc.map((item,index)=>(
              <div
                onClick={()=>navigate(`/appointment/${item._id}`)}
                className='group bg-[var(--color-canvas-white)] border border-[var(--border)] rounded-card overflow-hidden cursor-pointer hover:border-[var(--ink)] transition-all'
                key={index}
              >
                <div className='relative'>
                  <img className='bg-[var(--surface)] w-full aspect-[4/3] object-cover' src={item.image} alt={item.name} />
                  <div className={`absolute top-2 right-2 w-2.5 h-2.5 rounded-full ${item.available ? 'bg-green-500' : 'bg-[var(--muted)]'}`}></div>
                </div>
                <div className='p-4'>
                  <p className='text-[var(--ink)] font-semibold text-sm truncate'>{item.name}</p>
                  <p className='text-[var(--ink-secondary)] text-xs mt-1'>{item.speciality}</p>
                  <p className='text-[var(--ink)] text-xs font-medium mt-3 flex items-center gap-1 group-hover:gap-2 transition-all'>
                    Book <span>→</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </Section>
  </div>
  )
}

export default Doctors
