import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { Container } from './layout/Container'
import { Divider } from './layout/Divider'

const Footer = () => {
  const navigate = useNavigate()
  const linkClass = "text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors cursor-pointer"

  return (
    <footer className="mt-12">
      <Container>
        <Divider />

        <div className="py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <img
              className="mb-4 w-40 cursor-pointer"
              onClick={() => navigate('/')}
              src={assets.logo}
              alt="DocDock"
            />
            <p className="text-sm text-[var(--ink-secondary)] leading-relaxed max-w-xs">
              Book appointments, manage profile details, and track visits from one account.
            </p>
          </div>

          <div>
            <h4 className="font-medium text-[var(--ink)] mb-4 text-sm">Pages</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className={linkClass} onClick={() => navigate('/about')}>About</li>
              <li className={linkClass} onClick={() => navigate('/contact')}>Contact</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[var(--ink)] mb-4 text-sm">Patients</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className={linkClass} onClick={() => navigate('/doctors')}>Find doctors</li>
              <li className={linkClass} onClick={() => navigate('/login')}>Book appointment</li>
              <li className={linkClass} onClick={() => navigate('/my-appointments')}>My appointments</li>
              <li className={linkClass} onClick={() => navigate('/my-profile')}>My profile</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-[var(--ink)] mb-4 text-sm">Project</h4>
            <ul className="flex flex-col gap-3 text-sm">
              <li className={linkClass} onClick={() => navigate('/contact')}>Contact page</li>
              <li className="text-[var(--ink-secondary)]">Built with React, Express, and MongoDB</li>
            </ul>
          </div>
        </div>

        <Divider />
        <div className="py-6">
          <p className="text-sm text-[var(--ink-secondary)] text-center">
            &copy; 2026 DocDock.
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
