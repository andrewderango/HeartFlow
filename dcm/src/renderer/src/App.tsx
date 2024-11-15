import { HashRouter as Router, Route, Routes, Link } from 'react-router-dom'
import { UserProvider } from './context/UserContext'
import { ToastProvider } from './context/ToastContext'
import ToastContainer from './components/ToastContainer/ToastContainer'
import heartflowLogo from './assets/heartflow.png'
import Register from './pages/Register/Register'
import Login from './pages/Login/Login'
import Dashboard from './pages/Dashboard/Dashboard'
import Test from './pages/Test/Test'

// the main app component that sets up the router and routes

function App(): JSX.Element {
  const testSocket = new WebSocket('ws://localhost:8765')

  testSocket.onopen = (): void => {
    console.log('websocket connected')
    testSocket.send(JSON.stringify({ cmd: 'add', a: '1', b: '2' }))
    testSocket.send(JSON.stringify({ cmd: 'poop' }))
  }

  testSocket.onmessage = (event): void => {
    const data = JSON.parse(event.data as string)
    console.log('received from python: ', data)
  }

  return (
    // wrap the app in the user and toast providers
    <UserProvider>
      <ToastProvider>
        {/* wrap components in router for navigation */}
        <Router>
          {/* define the routes */}
          <Routes>
            {/* home route */}
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
                    <li className="electron-version">HeartFlow v2.0.0</li>
                  </ul>
                </>
              }
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/test" element={<Test />} />
          </Routes>
          {/* toast container to hold all the toasts, always included on all pages */}
          <ToastContainer />
        </Router>
      </ToastProvider>
    </UserProvider>
  )
}

export default App
