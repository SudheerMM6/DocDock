import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Button } from './ui/button'

const RelatedDoctors = ({ speciality, docId }) => {

  const { doctors } = useContext(AppContext)
  const navigate = useNavigate()

  const [relDoc, setRelDocs] = useState([])
  useEffect(() => {

    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
      setRelDocs(doctorsData)
    }

  }, [doctors, speciality, docId])

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold text-[var(--ink)] tracking-[-0.03em]">Related doctors</h2>
      <p className="text-[var(--ink-secondary)] text-sm mt-2">Doctors from the same speciality.</p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
            className="group bg-[var(--color-canvas-white)] border border-[var(--border)] rounded-card overflow-hidden cursor-pointer hover:border-[var(--ink)] transition-all"
            key={index}
          >
            <img className="w-full aspect-[4/3] object-cover bg-[var(--surface)]" src={item.image} alt={item.name} />
            <div className="p-4 text-left">
              <div className={`flex items-center gap-2 text-xs ${item.available ? 'text-green-600' : 'text-[var(--muted)]'}`}>
                <span className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : 'bg-[var(--muted)]'}`} />
                <span>{item.available ? 'Available' : 'Not available'}</span>
              </div>
              <p className="text-[var(--ink)] font-semibold mt-2">{item.name}</p>
              <p className="text-[var(--ink-secondary)] text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }}
        className="mt-10"
      >
        View all doctors
      </Button>
    </div>
  )
}

export default RelatedDoctors
