import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import { AppContext } from '../context/AppContext'

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  const { doctors } = useContext(AppContext)

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      // Search by name or speciality
      const matchedDoctor = doctors.find(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.speciality.toLowerCase().includes(searchTerm.toLowerCase())
      )
      
      if (matchedDoctor) {
        navigate(`/appointment/${matchedDoctor._id}`)
      } else {
        navigate(`/doctors`)
      }
      setSearchTerm('')
      setIsOpen(false)
    }
  }

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors px-3 py-2 rounded-full hover:bg-[var(--surface)]"
      >
        <Search className="w-4 h-4" />
        <span className="text-sm">Search</span>
      </button>
    )
  }

  return (
    <form onSubmit={handleSearch} className="hidden md:flex items-center gap-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--ink-secondary)]" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search doctors or specialties..."
          className="pl-9 pr-8 py-2 w-64 bg-[var(--surface)] border border-[var(--border)] rounded-full text-sm text-[var(--ink)] placeholder:text-[var(--ink-secondary)] focus:outline-none focus:border-[var(--ink)] transition-colors"
          autoFocus
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ink-secondary)] hover:text-[var(--ink)]"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
      <button
        type="button"
        onClick={() => {
          setIsOpen(false)
          setSearchTerm('')
        }}
        className="text-[var(--ink-secondary)] hover:text-[var(--ink)] p-2"
      >
        <X className="w-4 h-4" />
      </button>
    </form>
  )
}

export default SearchBar
