import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { Container } from './layout/Container';
import { Button } from './ui/button';

const navLinkClass = ({ isActive }) =>
  `px-4 py-2 rounded-full text-sm font-medium transition-colors ${
    isActive
      ? 'bg-[var(--surface)] text-[var(--ink)]'
      : 'text-[var(--ink-secondary)] hover:text-[var(--ink)] hover:bg-[var(--surface)]'
  }`;

const Navbar = () => {
    const navigate = useNavigate();

    const {token,setToken,userData} = useContext(AppContext)
    const [showMenu, setShowMenu] = useState(false)

    const logout = ()=>{
        setToken(false)
        localStorage.removeItem('token')
    }

  return (
    <header className="border-b border-[var(--border)] bg-[var(--color-canvas-white)]">
      <Container className="flex items-center justify-between py-6">
        {/* Logo */}
        <img
          onClick={() => navigate('/')}
          className="w-44 cursor-pointer"
          src={assets.logo}
          alt="DocDock"
        />

        {/* Desktop Navigation - Pill Group */}
        <nav className="hidden md:flex items-center gap-1 px-2 py-2 rounded-nav border border-[var(--border)] bg-[var(--color-canvas-white)]">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/doctors" className={navLinkClass}>
            Doctors
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        {/* Auth Actions */}
        <div className="flex items-center gap-3">
          {token && userData ? (
            <div className="flex items-center gap-2 cursor-pointer group relative">
              <img className="w-8 h-8 rounded-full object-cover" src={userData.image} alt="" />
              <img className="w-2.5" src={assets.dropdown_icon} alt="" />
              <div className="absolute top-full right-0 pt-2 text-sm font-medium text-[var(--ink-secondary)] z-20 hidden group-hover:block">
                <div className="min-w-48 bg-[var(--color-canvas-white)] border border-[var(--border)] rounded-card flex flex-col gap-1 p-2">
                  <button
                    onClick={() => navigate('/my-profile')}
                    className="text-left px-3 py-2 rounded-lg hover:bg-[var(--surface)] text-[var(--ink)] transition-colors"
                  >
                    My Profile
                  </button>
                  <button
                    onClick={() => navigate('/my-appointments')}
                    className="text-left px-3 py-2 rounded-lg hover:bg-[var(--surface)] text-[var(--ink)] transition-colors"
                  >
                    My Appointments
                  </button>
                  <div className="h-px bg-[var(--border)] my-1" />
                  <button
                    onClick={logout}
                    className="text-left px-3 py-2 rounded-lg hover:bg-[var(--surface)] text-[var(--ink)] transition-colors"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Sign in
              </Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
                Get started
              </Button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setShowMenu(true)}
            className="md:hidden p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
          >
            <img className="w-5 h-5" src={assets.menu_icon} alt="Menu" />
          </button>
        </div>
      </Container>

      {/* Mobile Menu */}
      <div className={`${showMenu ? 'fixed inset-0 z-50' : 'hidden'} md:hidden`}>
        <div className="absolute inset-0 bg-[var(--color-canvas-white)]">
          <Container className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="flex items-center justify-between py-6">
              <img className="w-36" src={assets.logo} alt="DocDock" />
              <button
                onClick={() => setShowMenu(false)}
                className="p-2 rounded-lg hover:bg-[var(--surface)] transition-colors"
              >
                <img className="w-5 h-5" src={assets.cross_icon} alt="Close" />
              </button>
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-2 mt-8">
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/"
                className="px-4 py-3 rounded-lg text-lg font-medium text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/doctors"
                className="px-4 py-3 rounded-lg text-lg font-medium text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
              >
                Doctors
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/about"
                className="px-4 py-3 rounded-lg text-lg font-medium text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
              >
                About
              </NavLink>
              <NavLink
                onClick={() => setShowMenu(false)}
                to="/contact"
                className="px-4 py-3 rounded-lg text-lg font-medium text-[var(--ink)] hover:bg-[var(--surface)] transition-colors"
              >
                Contact
              </NavLink>
            </nav>

            {/* Mobile Auth */}
            {!token && (
              <div className="mt-auto pb-8 flex flex-col gap-3">
                <Button variant="outline" size="lg" onClick={() => { setShowMenu(false); navigate('/login'); }}>
                  Sign in
                </Button>
                <Button variant="primary" size="lg" onClick={() => { setShowMenu(false); navigate('/login'); }}>
                  Get started
                </Button>
              </div>
            )}
          </Container>
        </div>
      </div>
    </header>
  )
}

export default Navbar