import { NavLink } from 'react-router-dom'
import { Cog6ToothIcon } from '@heroicons/react/24/outline'

export default function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-lg sm:text-xl font-semibold text-slate-900">Recruiter Outreach Tool</span>
        </NavLink>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/logs"
            className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
          >
            Logs
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) => `inline-flex items-center gap-1 text-sm font-medium ${isActive ? 'text-slate-900' : 'text-slate-600 hover:text-slate-900'}`}
            aria-label="Settings"
            title="Settings"
          >
            <Cog6ToothIcon className="h-5 w-5" />
            <span className="hidden sm:inline">Settings</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}