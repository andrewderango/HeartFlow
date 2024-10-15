import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom'
import heartflowLogo from './assets/heartflow.png'
import Register from './components/Register'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <img alt="logo" className="logo" src={heartflowLogo} />
              <div className="text">
                Welcome to <span className="react">HeartFlow</span>
              </div>
              <p className="tip">Empowering confidence and precision in pacemaker management</p>
              <div className="actions">
                <div className="action">
                  <Link to="/login">Log In User</Link>
                </div>
                <div className="action">
                  <Link to="/register">Register New User</Link>
                </div>
              </div>
              <ul className="versions">
                <li className="electron-version">HeartFlow v1.0.0</li>
              </ul>
            </>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App
