import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Home' },
  { to: '/find-donors', label: 'Find Donors' },
  { to: '/blood-info', label: 'Blood Info' },
  { to: '/helpline', label: 'Helpline' }
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-wine text-paper border-b-4 border-amber">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          <NavLink to="/" className="flex items-center gap-3">
            <svg width="30" height="30" viewBox="0 0 30 30" aria-hidden="true">
              <path
                d="M2 15 H10 L12 6 L16 24 L19 15 L22 15"
                fill="none"
                stroke="#E3A23C"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display italic text-2xl tracking-tight">Elixir</span>
          </NavLink>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm tracking-wide pb-1 border-b-2 transition-colors ${
                    isActive
                      ? 'border-amber text-white'
                      : 'border-transparent text-paper/85 hover:text-white hover:border-paper/40'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/register"
              className="bg-amber text-ink text-sm font-semibold px-4 py-2 rounded-sm hover:bg-white transition-colors"
            >
              Register as Donor
            </NavLink>
          </nav>

          <button
            className="md:hidden text-paper"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6L18 18M6 18L18 6" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>

        {open && (
          <nav className="md:hidden pb-5 flex flex-col gap-4">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="text-paper/90 text-sm"
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/register"
              onClick={() => setOpen(false)}
              className="bg-amber text-ink text-sm font-semibold px-4 py-2 rounded-sm text-center"
            >
              Register as Donor
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  )
}
