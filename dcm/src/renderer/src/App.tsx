import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import electronLogo from './assets/electron.svg'
import Register from './components/Register'

function App(): JSX.Element {
  const ipcHandle = (): void => window.electron.ipcRenderer.send('ping')

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
                  <a href="https://electron-vite.org/" target="_blank" rel="noreferrer">
                    Log In Existing User
                  </a>
                </div>
                <div className="action">
                  <Link to="/register" onClick={ipcHandle}>
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
      </Routes>
    </Router>
  )
}

export default App