import { NavLink } from 'react-router-dom'
import './ResumeNav.css'

function ResumeNav() {
  return (
    <nav className="resume-nav">
      <NavLink to="/builder" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Builder
      </NavLink>
      <NavLink to="/preview" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Preview
      </NavLink>
      <NavLink to="/proof" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
        Proof
      </NavLink>
    </nav>
  )
}

export default ResumeNav
