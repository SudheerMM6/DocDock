import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Container } from '../components/layout/Container'

const NotFound = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 bg-[var(--color-canvas-white)]">
      <Container>
        <div className="text-center max-w-md mx-auto">
          {/* 404 */}
          <div className="relative inline-block">
            <span className="text-8xl font-bold text-[var(--border)] select-none">404</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-bold text-[var(--ink)]">404</span>
            </div>
          </div>

          <h1 className="mt-8 text-2xl font-semibold text-[var(--ink)] tracking-[-0.02em]">
            Page not found
          </h1>
          <p className="mt-3 text-[var(--ink-secondary)] leading-relaxed">
            The page you're looking for seems to have wandered off. Let's get you back on track.
          </p>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-[var(--border)]">
            <p className="text-sm text-[var(--ink-secondary)] mb-4">Looking for something?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['Doctors', 'Appointments', 'About', 'Contact'].map((link) => (
                <button
                  key={link}
                  onClick={() => navigate(`/${link.toLowerCase()}`)}
                  className="text-sm text-[var(--ink-secondary)] hover:text-[var(--ink)] transition-colors"
                >
                  {link}
                </button>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default NotFound
