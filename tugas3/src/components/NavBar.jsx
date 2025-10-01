import { Link, NavLink } from 'react-router-dom'

export default function NavBar() {
  return (
    <nav className="navbar navbar-dark navbar-expand-lg border-bottom" style={{background:'#121420', borderColor:'rgba(255,255,255,0.08)'}}>
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          <span className="me-2" style={{color:'#5b8cff'}}>●</span> Tugas React (Dark)
        </Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><NavLink end to="/" className="nav-link">Home</NavLink></li>
            <li className="nav-item"><NavLink to="/team" className="nav-link">Team</NavLink></li>
            <li className="nav-item"><NavLink to="/contact" className="nav-link">Contact</NavLink></li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
