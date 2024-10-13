import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import electronLogo from './assets/electron.svg'
import Register from './components/Register'
import Login from './components/Login'

function App(): JSX.Element {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <img alt="logo" className="logo" src={electronLogo} />
              <div className="text">
                Welcome to <span className="react">HeartFlow</span>
              </div>
              <p className="tip">
                Empowering confidence and precision in pacemaker management
              </p>
              <div className="actions">
                <div className="action">
                  <Link to="/login">
                    Log In New User
                  </Link>
                </div>
                <div className="action">
                  <Link to="/register">
                    Register New User
                  </Link>
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
      </Routes>
    </Router>
  )
}

export default App