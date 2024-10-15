import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { ToastProvider } from './context/ToastContext'
import ToastContainer from './components/ToastContainer/ToastContainer'
import heartflowLogo from './assets/heartflow.png'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'

function App(): JSX.Element {
  return (
    <UserProvider>
      <ToastProvider>
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
          <ToastContainer />
        </Router>
      </ToastProvider>
    </UserProvider>
  )
}

export default App
